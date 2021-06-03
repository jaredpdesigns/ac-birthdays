import { useState, useEffect, useCallback } from "react";
import Loading from "@components/Loading";
import Villager from "@components/Villager";
import styles from "./Month.module.scss";
const Month = ({ currentMonth, today }) => {
  const [loading, setLoading] = useState(true);
  const [villagers, setVillagers] = useState([]);

  const getVillagers = useCallback(async () => {
    const query = "villagers?game=nh&nhdetails=true&birthmonth=" + currentMonth;
    const request = await fetch(`https://api.nookipedia.com/${query}`, {
      headers: {
        "X-API-KEY": process.env.NOOKIPEDIA_KEY,
        "Accept-Version": "2.0.0",
      },
    });
    const response = await request.json();
    const sort = await response.sort((a, b) =>
      Number(a.birthday_day) > Number(b.birthday_day) ? 1 : -1
    );
    setVillagers(sort);
    setLoading(false);
    const active = document.getElementById("active");
    if (active) {
      const yOffset = -176;
      const y =
        active.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    getVillagers();
  }, []);

  return (
    <section
      className={`${styles.Month} flow--grid flow__align--h-center flow__align--v-start flow__grid--gap-l`}
    >
      {loading && (
        <section className={styles.MonthLoading}>
          <Loading />
        </section>
      )}
      {villagers &&
        villagers.map((item, index) => (
          <Villager
            active={
              today.month === item.birthday_month &&
              today.day === item.birthday_day
                ? true
                : false
            }
            villager={item}
            key={index}
          />
        ))}
    </section>
  );
};
export default Month;
