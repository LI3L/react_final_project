import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Layout/register.module.css";
import axios from "axios";
import Level from "./level.jsx";

export default function GetDiff({ dif }) {
  console.log("GetDiff");
  return (
    <div>
      {dif == "easy" ? (
        <div>
          <Level dif={dif} />
        </div>
      ) : dif == "medium" ? (
        <div>
          <Level dif={dif} />
        </div>
      ) : dif == "hard" ? (
        <div>
          <Level dif={dif} />
        </div>
      ) : dif == "random" ? (
        <div>
          <h1>random</h1>
        </div>
      ) : (
        <div>
          <h1>no dif</h1>
        </div>
      )}
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
