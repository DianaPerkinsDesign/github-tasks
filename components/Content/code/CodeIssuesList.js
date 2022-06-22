import useSWR from "swr";
import _, { reduce } from "lodash";
import styles from "../../../styles/CodeIssuesList.module.scss";

const CodeIssuesList = (f) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/getIssuesByFile", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log("Current File", f.currentFile);

  // The labels are counting on the best one (1,2,0,G) being the second in the array. If `bug` is removed from issues, this will need to be updated.

  const list = Object.keys(data[f.currentFile]).map((k) => (
    <li key={k} className={styles.issueContainer}>
      <h2 className={styles.lineNumber}>
        <span>L</span>
        {k}
      </h2>
      <div className={styles.issues}>
        {data[f.currentFile][k].map((i) => (
          <div className={styles.issue} key={i + i.number}>
            <span className={styles.risk}>
              <span
                className={styles.labelMarker}
                style={{ backgroundColor: "#" + i.labels[1].color }}
              >
                {i.labels[1].name.substring(0, 1)}
              </span>
            </span>
            <span className={styles.issueTitle}>
              <a
                href={i.url}
                target="_blank"
                ariaLabel={i.title + ` opens in new window`}
              >
                {i.title}
              </a>
            </span>
          </div>
        ))}
      </div>
    </li>
  ));
  return (
    <div className={styles.sidebar}>
      <ul className={styles.issuesContainer}>{list}</ul>
      <p></p>
    </div>
  );
};

export default CodeIssuesList;
