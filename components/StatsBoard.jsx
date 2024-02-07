import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StatsBoard() {
  const [statsBoard, setStatsBoard] = useState([]);


  async function getStatsBoard() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/users/top/users"
      );
      setStatsBoard(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  

  useEffect(() => {
    getStatsBoard();
    console.log("useEffect" + JSON.stringify(statsBoard));
  }, []);

  return (
    <div style={{ padding: "0 30", overflow: "auto" }}>
      <h1>Stats Board</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Rank</th>
            <th style={styles.tableHeader}>Username</th>
            <th style={styles.tableHeader}>Points</th>
          </tr>
        </thead>
        <tbody>
          {statsBoard.map((entry, index) => (
            <tr
              key={index}
              style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <td style={styles.tableData}>{index + 1}</td>
              <td style={styles.tableData}>{entry.name}</td>
              <td style={styles.tableData}>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableHeader: {
    backgroundColor: "#89e219",
    padding: "12px",
    border: "5px solid #000000",
  },
  tableData: {
    padding: "12px",
    border: "5px solid #000000",
  },
  evenRow: {
    backgroundColor: "#57CC04",
  },
  oddRow: {
    backgroundColor: "#89e219",
  },
};
