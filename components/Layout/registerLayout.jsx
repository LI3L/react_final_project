import styles from "./register.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.registerPage}>
      <main>{children}</main>
    </div>
  );
}
