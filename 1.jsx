import { useState } from "react";

const INITIAL_STYLE_STATE = {
  fontWeight: {
    flag: false,
    style: "normal"
  },
  fontStyle: {
    flag: false,
    style: "normal"
  },
  textDecoration: {
    flag: false,
    style: "none"
  }
};

export default function App() {
  const [v, setV] = useState("BigBinary!");
  const [styles, setStyles] = useState(INITIAL_STYLE_STATE);

  const handleStyleChange = (e) => {
    const flag = e.target.checked;
    const styleName = e.target.name;
    const styleValue = getStyleValue(styleName, flag);
    setStyles((prevStyle) => {
      return {
        ...prevStyle,
        [styleName]: {
          flag: flag,
          style: styleValue
        }
      };
    });
  };

  const getStyleValue = (styleName, falg) => {
    switch (styleName) {
      case "fontWeight":
        return falg ? "bold" : "normal";
      case "fontStyle":
        return falg ? "italic" : "normal";
      case "textDecoration":
        return falg ? "underline" : "none";
        break;
      default:
    }

    return styleObj;
  };

  const extractStyles = () => {
    const extractedStyle = {};
    Object.keys(styles).forEach(function (key, _) {
      extractedStyle[key] = styles[key].style;
    });

    return extractedStyle;
  };

  return (
    <>
      <input value={v} onChange={(e) => setV(e.target.value)} />
      <br />
      <span>
        <input
          onChange={handleStyleChange}
          name="fontWeight"
          type="checkbox"
          checked={styles.fontWeight?.flag || false}
        />
        Bold
      </span>
      <br />
      <span>
        <input
          onChange={handleStyleChange}
          name="fontStyle"
          type="checkbox"
          checked={styles.fontStyle?.flag || false}
        />
        Italics
      </span>
      <br />
      <span>
        <input
          onChange={handleStyleChange}
          name="textDecoration"
          type="checkbox"
          checked={styles.textDecoration?.flag || false}
        />
        Underline
      </span>
      <br />
      <br />
      <br />
      <div style={extractStyles()}>{v}</div>
    </>
  );
}

