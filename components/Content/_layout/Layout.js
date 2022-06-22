import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";
import Head from "next/head";
import styles from "../../../styles/Layout.module.scss";
import logo from "../../../images/c4-logo.svg";

export default function Layout({ children, sideNavName }) {
  return (
    <div className={styles.main_wrapper}>
      <Head>
        <meta name="description" content="C4 Findings App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.logo}>
        <a href="/">
          <img src={logo.src} alt="C4" />
        </a>
      </h1>
      <Header />
      <SideNav sideNavName={sideNavName} />
      <main className={styles.main_content}>
        {children}
        <Footer />
      </main>
    </div>
  );
}
