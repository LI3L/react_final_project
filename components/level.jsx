import React, { useState ,useEffect} from "react";
import { useRouter } from "next/router";
import styles from "./Layout/register.module.css";
import axios from "axios";

export default function Level({ userId,dif }) {
  const [user, setUser] = useState({});
  const [words, setWords] = useState([]);
  async function getWords() {
    try {
      if (userId) {
        const response = await axios.get(
          "http://localhost:3001/api/words/byDifficulty/"+dif
        );
        console.log(response.data);
        setWords(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getUser() {
    try {
      if (userId) {
        const response = await axios.get(
          "http://localhost:3001/api/users/" + userId
        );
        setUser(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getWords();
    getUser();
  }, []);

  return (
    <div
      style={{
        margin: 0,
        width: "100%",
        height: "88%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        flexDirection: "column",
        position: "absolute",
      }}
    >
      <h1>{(words)?words[0].name:"h"}</h1>
      <input style={{margin:10}} type="text" />
      <div>
        <button style={{margin:10}}>check</button>
        <button>next</button>

      </div>
    </div>
  );
}

// RegisterUser.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   );
// };
