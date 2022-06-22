import Head from "next/head";
import Layout from "../../components/Content/_layout/Layout";
import { redirect } from "next/dist/server/api-utils";
import IssuesHome from "../../components/content/issues/IssuesHome";
import styles from "../../styles/Layout.module.scss";

export default function Issues() {
  return (
    <>
      <Head>
        <title>Issues | C4 Findings</title>
      </Head>

      <Layout sideNavName="issues">
        <h1 className={styles.pageTitle}>Issues</h1>
        <p className={styles.pageSubtitle}>All open issues in this contest </p>

        <IssuesHome />
      </Layout>
    </>
  );
}
