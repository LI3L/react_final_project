import styles from "./login.module.css";
import CustomNavbar from "../navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.logInPage}>
        <main>{children}</main>
      </div>
    </>
  );
}
