import Link from "next/link";
import { CalendarEvent } from "tabler-icons-react";
import styles from "./VillagerSearch.module.scss";

const VillagerSearch = ({ villager }) => {
  return (
    <Link
      href="/villagers/[villager]/"
      as={`/villagers/${villager.name}`}
      passHref
    >
      <a
        className={`${styles.VillagerSearch} padding__all--s radius--s smooth type__align--center`}
        style={{
          "--bg": "#" + villager.title_color,
          "--type": "#" + villager.text_color,
        }}
        title={`More details about ${villager.name}`}
      >
        <p>
          <strong>{villager.name}</strong>
        </p>
        <p className="flow--flex flow__align--h-center flow__align--v-center oomph__h--s type__size--s-s">
          <CalendarEvent size={24} />
          <span className="type__weight--semibold">
            {villager.birthday_month} {villager.birthday_day}
          </span>
        </p>
      </a>
    </Link>
  );
};
export default VillagerSearch;
