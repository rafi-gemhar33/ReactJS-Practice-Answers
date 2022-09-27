import { useState, useEffect } from "react";

/**
 * Making a GET request to https://randomuser.me/api/?results=50
 * returns the information of 50 users.
 *
 * In this sandbox, you are required to convert some
 * of that information into a table.
 *
 * The columns of the table are mentioned in
 * the sandbox below.
 */

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((res) => res.json())
      .then(({ results }) => {
        setUsers(results);
      });
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.name.first}</td>
              <td>{user.location.city}</td>
              <td>{user.location.state}</td>
              <td>{user.location.state}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.location.coordinateslatitude}</td>
              <td>{user.location.coordinates.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
