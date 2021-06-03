import Link from "next/link";
import { CalendarEvent } from "tabler-icons-react";
import styles from "./VillagerSearch.module.scss";

const Villager = ({ villager }, props) => {
  return (
    <Link
      href="/villagers/[villager]/"
      as={`/villagers/${villager.name.toLowerCase()}`}
      passHref
    >
      <a
        className={`${styles.VillagerSearch} radius--s smooth`}
        style={{
          "--bg": "#" + villager.title_color,
          "--type": "#" + villager.text_color,
        }}
        title={`More details about ${villager.name}`}
      >
        <figure className="flow--flex oomph__h--s padding__all--s radius--s">
          <img
            alt={`Featured image for ${villager.name}`}
            loading="lazy"
            src={villager.image_url}
            height="64"
            width="64"
          />
          <figcaption className="type__align--left">
            <span className="type__size--m-l">
              <strong>{villager.name}</strong>
            </span>
            <span className="flow--flex flow__align--h-center flow__align--v-center oomph__h--s type__size--s-s">
              <CalendarEvent size={24} />
              <span className="type__weight--semibold">
                {villager.birthday_month} {villager.birthday_day}
              </span>
            </span>
          </figcaption>
        </figure>
      </a>
    </Link>
  );
};
export default Villager;
