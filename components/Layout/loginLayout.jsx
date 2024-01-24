import styles from "./login.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.logInPage}>
      <main>{children}</main>
    </div>
  );
}
