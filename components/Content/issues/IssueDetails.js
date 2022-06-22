import styles from "../../../styles/Table.module.scss";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }) => {
  return (
    <>
      <tr class={styles.issueDetails}>
        <td colSpan={4}>
          <div className={styles.titleHolder}>
            <h3 className={styles.issueTitle}>Issue {issue.number}</h3>
            <a href={issue.html_url}>GitHub&nbsp;↗</a>
          </div>
          <ul className={styles.labelList}>
            {issue.labels.map(
              (l) =>
                l.name !== "bug" && (
                  <li>
                    <span
                      className={styles.labelMarker}
                      style={{ borderColor: "#" + l.color }}
                    >
                      {l.name}
                    </span>
                  </li>
                )
            )}
          </ul>
          <div class={styles.issueBody}>
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          </div>
        </td>
      </tr>
    </>
  );
};

export default IssueDetails;
