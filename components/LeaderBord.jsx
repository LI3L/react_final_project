import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LeaderBord() {
  const [leaderBord, setLeaderBord] = useState([]);

  async function getLeaderBord() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/users/top/users"
      );
      setLeaderBord(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLeaderBord();
    console.log("useEffect" + JSON.stringify(leaderBord));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Rank</th>
            <th style={styles.tableHeader}>Username</th>
            <th style={styles.tableHeader}>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderBord.map((entry, index) => (
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
    backgroundColor: "#57CC04",
    padding: "12px",
    border: "1px solid #000000",
  },
  tableData: {
    padding: "12px",
    border: "1px solid #000000",
  },
  evenRow: {
    backgroundColor: "#57CC04",
  },
  oddRow: {
    backgroundColor: "#89e219",
  },
};
