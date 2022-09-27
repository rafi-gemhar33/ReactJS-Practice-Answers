import { useState, useEffect, useRef } from "react";

const petsDB = {
  dogs: { name: "Dogs", voice: "Woof!", avatar: "🐶" },
  cats: { name: "Cats", voice: "Miauuu", avatar: "🐱" }
};

function getPet(type) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("###########################");
      resolve(petsDB[type]);
    }, 3000);
  });
}

function Pets() {
  const [selectedPet, setSelectedPet] = useState("");
  const [petInformation, setPetInformation] = useState(null);
  const mounted = useRef(false);
  /**
   * The error happens because of this
   * delayed setPetInformation call which
   * gets called after the component gets
   * unmounted, fix this here!
   */
  useEffect(() => {
    mounted.current = true;
    if (selectedPet !== "") {
      getPet(selectedPet).then((info) => {
        if (mounted.current) {
          console.log("**************************");

          setPetInformation(info);
        }
      });
    } else {
      setPetInformation(null);
    }
    return () => (mounted.current = false);
  }, [selectedPet]);

  const onChange = ({ target: { value } }) => setSelectedPet(value);

  return (
    <div>
      <select value={selectedPet} onChange={onChange}>
        <option value="">Select a pet</option>
        <option value="cats">Cats</option>
        <option value="dogs">Dogs</option>
      </select>
      {petInformation && (
        <div>
          <h2>{petInformation.name}</h2>
          <div>{`Voice - ${petInformation.voice}`}</div>
          <div>{petInformation.avatar}</div>
        </div>
      )}
    </div>
  );
}

/**
 * This sandbox simulates a trivial real
 * life example.
 *
 * Selecting an option from the dropdown
 * triggers a fake API call which returns
 * some information about the pet. However,
 * clicking "Hide" unmounts the component.
 * Steps to reproduce the problem:
 * 1. Select an animal from the dropdown
 * 2. Quickly click "Hide"
 * 3. See that there is an error logged in
 *    the console.
 *
 * The error reads:
 * ```
 * Warning: Can't perform a React
 * state update on an unmounted component...
 * ```
 *
 * This implies that our application is trying
 * to update the state in a component which
 * isn't currently mounted.
 *
 * Task: Fix this error! You will have to
 * update Pets.jsx to fix this error since
 * the state update happens in that file.
 *
 */

export default function App() {
  const [showPets, setShowPets] = useState(true);
  const toggle = () => setShowPets((show) => !show);

  return (
    <div className="App">
      <button onClick={toggle}>{showPets ? "Hide" : "Show"}</button>
      <br />
      <br />
      {showPets && <Pets />}
    </div>
  );
}
