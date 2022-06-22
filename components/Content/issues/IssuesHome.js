import styles from "../../../styles/Issues.module.scss";
import IssuesList from "./IssuesList";

const IssuesHome = () => {
  return (
    <div className={styles.parent}>
      <div className={`${styles.titlebar}`}></div>
      <div>
        <IssuesList />
      </div>
    </div>
  );
};

export default IssuesHome;
