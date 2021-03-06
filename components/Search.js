import { useCallback, useEffect, useRef, useState } from "react";
import { getVillagers } from "@components/API";
import Loading from "@components/Loading";
import VillagerSearch from "@components/VillagerSearch";
import styles from "./Search.module.scss";
import { Search, X } from "tabler-icons-react";

const SearchPanel = ({ visible, toggleSearch }) => {
  const searchRef = useRef(null);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [villagers, setVillagers] = useState([]);
  const clearQuery = useCallback(() => {
    toggleSearch(false);
    setQuery("");
    setVillagers([]);
  }, []);
  const onChange = useCallback(async (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      setVillagers([]);
      setLoading(true);
      const response = await getVillagers();
      if (response) {
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
      }
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
      toggleSearch(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  useEffect(() => {
    const searchy = document.getElementById("searchy");
    searchy.focus();
  }, []);

  return (
    <section
      className={`${styles.Search} ${visible ? styles.SearchVisible : ""} radius__bl--s radius__br--s shadow`}
      ref={searchRef}
    >
      <section className={`${styles.SearchInner} border__bottom border__left border__right color__bg--contrast color__border--base--light flow--flex flow__direction--column radius__bl--s radius__br--s width__ml`}>
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
            placeholder="Search???"
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
          <section className={`${styles.SearchLoading} type__align--center`}>
            <Loading />
          </section>
        )}
        {active && villagers.length > 0 && (
          <section
            className={`${styles.SearchResults} border__top color__border--base--light flow--grid flow__grid--gap-xs flow__flex--grow flow__flex--shrink margin__bottom--s padding__all--s`}
          >
            {villagers.map((item, index) => (
              <VillagerSearch villager={item} key={index} />
            ))}
          </section>
        )}
        {!loading && query && !villagers.length && (
          <section
            className={`${styles.SearchResults} border__top color__border--base--light flow__flex--grow flow__flex--shrink oomph__v--xs padding__all--m`}
          >
            <p className="color__type--base--mid type__size--s-s">
              <em>No villagers found</em>
            </p>
          </section>
        )}
      </section>
    </section>
  );
};
export default SearchPanel;
