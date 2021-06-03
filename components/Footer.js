import Link from "next/link";
import { Code } from "tabler-icons-react";
import styles from "./Footer.module.scss";

const Footer = () => (
  <footer
    className={`${styles.Footer} border__top color__border--base--light padding__all--m type__align--center`}
  >
    <span className="flow--inline flow__align--v-center type__size--s-m type__weight--semibold">
      <span className="flow--inline margin__right--s">
        <Code size={24} />
      </span>
      Built for&nbsp;
      <a
        className="smooth"
        href="https://averymirabelle.com"
        rel="noopener"
        target="_blank"
        title="Visit Avery's amazing site"
      >
        Avery
      </a>
      &nbsp;by&nbsp;
      <a
        className="smooth"
        href="https://jaredpendergraft.com"
        rel="noopener"
        target="_blank"
        title="Check out other great projects by Dad"
      >
        Dad
      </a>
    </span>
  </footer>
);

export default Footer;
