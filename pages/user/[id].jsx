import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CustomNavbar from "../../components/navbar";
import GetDiff from "../../components/getDiff.jsx";

export default function Home() {
  const router = useRouter();
  const userId = router.query.id;
  const [user, setUser] = useState({});
  const [dif, setDif] = useState("");

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
  const handleNavbarData = (dataFromNavbar) => {
    setDif(dataFromNavbar);
    // Do something with the data received from CustomNavbar
    console.log("Data from CustomNavbar:", dif);
  };
  return (
    getUser(),
    <>
      <CustomNavbar user={user.name} userid={userId} onNavbarData={handleNavbarData}/>
      <GetDiff dif={dif} userId={userId}/>
    </>
  );
}
