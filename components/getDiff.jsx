import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Layout/register.module.css";
import axios from "axios";

export default function GetDiff({ dif }) {
  return (
    <div>
      <h1>{dif}</h1>
      {dif == "easy" ? (
        <div>
          <h1>easy</h1>
        </div>
      ) : dif == "medium" ? (
        <div>
          <h1>medium</h1>
        </div>
      ) : dif == "hard" ? (
        <div>
          <h1>medium</h1>
        </div>
      ) : (
        <div>
          <h1>random</h1>
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
