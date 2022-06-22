import styles from "../../../styles/Layout.module.scss";
import UpdateButton from "../../UpdateButton";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_left}>
          <h2>Findings</h2>
          <p>{process.env.NEXT_PUBLIC_REPO}</p>
        </div>

        <nav>
          <UpdateButton />
        </nav>
      </header>
    </>
  );
};

export default Header;
