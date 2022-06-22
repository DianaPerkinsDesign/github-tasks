import styles from "../../../styles/Layout.module.scss";
import iconCode from "../../../images/icon-code.svg";
import iconPapers from "../../../images/icon-papers.svg";
import iconIssues from "../../../images/icon-issues.svg";

export default function SideNav({ sideNavName }) {
  return (
    <>
      <nav className={styles.sidebar}>
        <ul>
          <li active={sideNavName === "issues" ? "active" : ""}>
            <a href="/issues" title="issues">
              <img src={iconIssues.src} />
            </a>
          </li>
          <li active={sideNavName === "code" ? "active" : ""}>
            <a href="/code" title="code">
              <img src={iconCode.src} />
            </a>
          </li>
          <li active={sideNavName === "papers" ? "active" : ""}>
            <a href="/papers" title="papers">
              <img src={iconPapers.src} />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
