import { useCallback } from "react";
import styles from "./NavBar.module.scss";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
const NavBar = ({ currentMonth, monthChange }) => {
  return (
    <nav
      className={`${styles.NavBar} border__bottom color__bg--contrast color__border--base--light`}
    >
      <section className="flow--flex flow__align--h-between flow__align--v-center padding__left--m padding__right--m width__l">
        <button
          onClick={() => monthChange(currentMonth > 1 ? currentMonth - 1 : 12)}
          className="flow--inline flow__align--h-center flow__align--v-center flow__size--h-xl flow__size--w-xl smooth"
          title="Previous Month"
        >
          <ArrowLeft size={24} />
        </button>
        <p className="padding__all--m type__size--l-l">
          <strong>
            {String(
              new Date(2021, currentMonth - 1, 1).toLocaleString("default", {
                month: "long",
              })
            )}
          </strong>
        </p>
        <button
          onClick={() => monthChange(currentMonth < 12 ? currentMonth + 1 : 1)}
          className="flow--inline flow__align--h-center flow__align--v-center flow__size--h-xl flow__size--w-xl smooth"
          title="Next Month"
        >
          <ArrowRight size={24} />
        </button>
      </section>
    </nav>
  );
};

export default NavBar;
