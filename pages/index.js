import { useState } from "react";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
import Header from "@components/Header";
import Layout from "@components/Layout";
import Month from "@components/Month";
import styles from "./Home.module.scss";
function Home() {
  const currentMonth = new Date().getMonth() + 1;
  const today = {
    month: String(new Date().toLocaleString("default", { month: "long" })),
    day: String(new Date().getDate()),
  };
  const [month, setMonth] = useState(currentMonth);
  function nextMonth() {
    if (month < 12) {
      setMonth((month) => month + 1);
    } else {
      setMonth(1);
    }
  }
  function prevMonth() {
    if (month > 1) {
      setMonth((month) => month - 1);
    } else {
      setMonth(12);
    }
  }
  return (
    <Layout>
      <Header />
      <main>
        <nav
          className={`${styles.HomeNav} border__bottom color__bg--contrast color__border--base--light flow--flex flow__align--h-between flow__align--v-center padding__left--m padding__right--m`}
        >
          <button
            onClick={prevMonth}
            className="flow--inline flow__align--h-center flow__align--v-center flow__size--h-xl flow__size--w-xl smooth"
            title="Previous Month"
          >
            <ArrowLeft size={24} />
          </button>
          <p className="padding__all--m type__size--l-l">
            <strong>
              {String(
                new Date(2021, month - 1, 1).toLocaleString("default", {
                  month: "long",
                })
              )}
            </strong>
          </p>
          <button
            onClick={nextMonth}
            className="flow--inline flow__align--h-center flow__align--v-center flow__size--h-xl flow__size--w-xl smooth"
            title="Next Month"
          >
            <ArrowRight size={24} />
          </button>
        </nav>
        <article className={`${styles.Home} padding__all--l`}>
          <Month currentMonth={month} today={today} key={month} />
        </article>
      </main>
    </Layout>
  );
}

export default Home;
