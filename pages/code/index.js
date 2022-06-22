import Head from "next/head";
import Layout from "../../components/Content/_layout/Layout";
import ContentGrid from "../../components/content/code/CodeHome";
import styles from "../../styles/Layout.module.scss";

export default function Issues() {
  return (
    <>
      <Head>
        <title>Code | C4 Findings</title>
      </Head>

      <Layout sideNavName="code">
        <h1 className={styles.pageTitle}>Code</h1>
        <p className={styles.pageSubtitle}>View issues in context</p>
        <ContentGrid></ContentGrid>
      </Layout>
    </>
  );
}
