import { useState, useEffect } from "react";

/**
 *
 * Implement a sort and filter functionality
 * which satisfies the following conditions:
 *
 *
 * FOR SORT:
 * 1. The data is unsorted on page load
 * 2. Clicking on a column header sorts
 *      that column in an ascending manner.
 * 3. Clicking the same column header again
 *      sorts that column in the descending order.
 * 4. Clicking the same column header again
 *      for the third time resorts it in an
 *      ascending manner. That is, the data is
 *       unsorted only on page load.
 * 5. The table should remember how each column
 *      is sorted. For example: Clicking on "First Name"
 *      should sort the data according to the
 *      first name in an ascending manner. Then
 *      clicking on "City" should sort the data
 *      _*only on*_ "City" in an ascending fashion.
 *      However, reclicking on "First Name" should
 *      sort the table on First Name in the
 *      descending order.
 *
 * FOR FILTER:
 * 1. When the user writes anything in the
 * input field, the table should only contain
 * rows which have the string in any of the columns.
 *
 * 2. Filtering is case in sensitive.
 *
 *
 */

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [columnsortData, setColumnSortData] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((res) => res.json())
      .then(({ results: userApiData }) => {
        setUsers(userApiData);
        setTableData(getInitialTableData(userApiData));
      });
  }, []);

  const getInitialTableData = (userApiData) => {
    return userApiData.map(({ name, location, login, phone }) => [
      name.first,
      location.city,
      location.state,
      location.country,
      login.username,
      phone,
      location.coordinates.latitude,
      location.coordinates.longitude
    ]);
  };

  const handleSort = (index) => {
    const currentOrder = columnsortData[index];
    switch (currentOrder) {
      case 0:
        columnsortData[index] = 1;
        break;
      case 1:
        columnsortData[index] = -1;
        break;
      case -1:
        columnsortData[index] = 0;
        break;
      default:
      // noop
    }
    setColumnSortData([...columnsortData]);
    let newSortData = [...sortArray(index, columnsortData[index])];
    setTableData(newSortData);
  };

  const sortArray = (column, order) => {
    if (order === 0) {
      return getInitialTableData(users);
    } else {
      return tableData.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        if (order === 1) {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
        } else {
          if (valueA > valueB) return -1;
          if (valueA < valueB) return 1;
        }
        return 0;
      });
    }
  };

  const handleSearchTextChange = (e) => {
    let filteredData = [];
    if (e.target.value !== "") {
      const substring = e.target.value.toUpperCase();
      filteredData = getInitialTableData(users).filter((e) => {
        return e.find((element) => {
          const ele = element.toUpperCase();
          if (ele.includes(substring)) {
            return true;
          }
          return false;
        });
      });
      setTableData([...filteredData]);
    } else {
      filteredData = getInitialTableData(users);
    }
    setTableData([...filteredData]);

    setSearchText(e.target.value);
  };

  return (
    <>
      <input value={searchText} onChange={handleSearchTextChange} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort(0)}>First name</th>
            <th onClick={() => handleSort(1)}>City</th>
            <th onClick={() => handleSort(2)}>State</th>
            <th onClick={() => handleSort(3)}>Country</th>
            <th onClick={() => handleSort(4)}>Username</th>
            <th onClick={() => handleSort(5)}>Phone</th>
            <th onClick={() => handleSort(6)}>Latitude</th>
            <th onClick={() => handleSort(7)}>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user, userIdx) => (
            <tr key={userIdx}>
              {user.map((cellValue, cellValueIdx) => (
                <td key={`${userIdx}-${cellValueIdx}`}>{cellValue}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
