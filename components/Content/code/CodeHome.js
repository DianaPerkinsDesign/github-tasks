import styles from "../../../styles/Code.module.scss";
import TitlebarSelect from "../../TitlebarSelect";
import testContent from "../../../_data/_testContent.js";
import Code from "./Code";
import CodeIssuesList from "./CodeIssuesList";
import useSWR from "swr";

const ContentGrid = () => {
  // const issues = async () => {
  //   const issuesFromGitHub = await fetch("/api/getIssues").then((res) =>
  //     res.json()
  //   );
  //   return issuesFromGitHub;
  // };

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/getIssuesByFileNoGas", fetcher);

  if (error) {
    return <div>Something's wrong</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const currentFile = Object.keys(data)[0];
  // needs to be hooked up to currentFile
  const codeString = testContent();

  // List of files to populate the file name dropdown
  const filesList = Object.keys(data).map((k) => k);

  // List of issues to populate the issue dropdown
  const issuesList = Object.keys(data).map((k) => k);

  return (
    <div className={styles.parent}>
      {/* Titlebar (does not include the line number select) */}
      <div className={`${styles.titlebar}`}>
        <div className={`${styles.leftSelect}`}>
          <TitlebarSelect data={filesList} />
        </div>
      </div>

      {/* Line number select */}
      <div style={{ background: "#28277c" }}>{/* <TitlebarSelect /> */}</div>

      {/* Code */}
      <div className={styles.code}>
        <Code codeString={codeString} />
      </div>

      {/* Issues list */}
      <div>
        <CodeIssuesList currentFile={currentFile} />
      </div>
    </div>
  );
};

export default ContentGrid;
