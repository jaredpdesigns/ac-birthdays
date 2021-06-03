import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X } from "tabler-icons-react";
import Loading from "@components/Loading";
import VillagerSearch from "@components/VillagerSearch";
import styles from "./Search.module.scss";
const SearchPanel = (props) => {
  const searchRef = useRef(null);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [villagers, setVillagers] = useState([]);
  const clearQuery = useCallback(() => {
    props.onClearQuery();
    setQuery("");
    setVillagers([]);
  }, []);
  const onChange = useCallback(async (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      setLoading(true);
      const request = await fetch(
        `https://api.nookipedia.com/villagers?game=nh&nhdetails=true`,
        {
          headers: {
            "X-API-KEY": process.env.NOOKIPEDIA_KEY,
            "Accept-Version": "2.0.0",
          },
        }
      );
      const response = await request.json();
      const filtered = response.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.birthday_month.toLowerCase().includes(query.toLowerCase()) ||
          item.birthday_day.toLowerCase().includes(query.toLowerCase())
        );
      });
      const sort = filtered.sort((a, b) => {
        if (Number(a.birthday_day) < Number(b.birthday_day)) return -1;
        if (Number(a.birthday_day) > Number(b.birthday_day)) return 1;
        if (a.birthday_month > b.birthday_month) return 1;
        if (a.birthday_month < b.birthday_month) return -1;
      });
      setVillagers(sort);
      setLoading(false);
    } else {
      setVillagers([]);
    }
  }, []);
  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      props.onClearQuery();
      window.removeEventListener("click", onClick);
    }
  }, []);

  useEffect(() => {
    const searchy = document.getElementById("searchy");
    searchy.focus();
  }, []);

  return (
    <section
      className={`${styles.Search} color__bg--contrast flow--flex flow__direction--column radius__bl--s radius__br--s shadow`}
      ref={searchRef}
    >
      <section
        className={`${styles.SearchInput} flow--flex flow__align--v-center flow__flex--shrink-no padding__all--m`}
      >
        <span className="color__type--base--semi flow--inline flow__align--h-center flow__align--v-center flow__size--h-xl flow__size--w-xl">
          <Search size={20} />
        </span>
        <input
          id="searchy"
          className="flow__size--h-xl padding__left--xl padding__right--xl type__size--m-l"
          onChange={onChange}
          onFocus={onFocus}
          placeholder="Search…"
          type="text"
          value={query}
        />
        {query && (
          <button
            className="color__type--base--semi flow--inline flow__align--h-center flow__align--v-center flow__size--h-xl flow__size--w-xl smooth"
            onClick={clearQuery}
          >
            <X size={16} />
          </button>
        )}
      </section>
      {active && loading && (
        <section className="type__align--center">
          <Loading />
        </section>
      )}
      {active && villagers.length > 0 && (
        <section
          className={`${styles.SearchResults} border__top color__border--base--light flow__flex--grow flow__flex--shrink oomph__v--s padding__all--m`}
        >
          {villagers.map((item, index) => (
            <VillagerSearch villager={item} key={index} />
          ))}
        </section>
      )}
    </section>
  );
};
export default SearchPanel;
