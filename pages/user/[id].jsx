import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CustomNavbar from "../../components/navbar";

export default function Home() {
  const router = useRouter();
  const userId = router.query.id;
  const [user, setUser] = useState({});

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
    getUser();
  }, []);

  return (
    <>
      <CustomNavbar> {user.name}</CustomNavbar>
      <h1>Hello {user.name}</h1>
    </>
  );
}
