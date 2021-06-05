import { useCallback, useState } from "react";
import Header from "@components/Header";
import Layout from "@components/Layout";
import Month from "@components/Month";
import NavBar from "@components/NavBar";
const Home = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const today = {
    month: String(new Date().toLocaleString("default", { month: "long" })),
    day: String(new Date().getDate()),
  };
  const getMonth = useCallback((value) => {
    setMonth(value);
  }, []);
  return (
    <Layout>
      <Header />
      <main>
        <NavBar currentMonth={month} monthChange={getMonth} />
        <article className="padding__all--l">
          <Month currentMonth={month} today={today} key={month} />
        </article>
      </main>
    </Layout>
  );
};

export default Home;
