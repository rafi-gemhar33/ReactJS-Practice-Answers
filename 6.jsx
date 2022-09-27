import React, { useState, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=20")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const getFullName = (nameobj) => {
    return Object.values(nameobj).join(" ")
  }

  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.email}>
            <h1>Name {getFullName(user.name)}</h1>
            <img src={user?.picture?.large} alt={getFullName(user.name)} />
          </div>
        ))
      ) : (
        <p>No users available :)</p>
      )}
    </>
  );
}
