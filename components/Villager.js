import Link from "next/link";
import Confetti from "react-confetti";
import { CalendarEvent } from "tabler-icons-react";
import styles from "./Villager.module.scss";

const Villager = ({ villager, active }) => {
  return (
    <Link
      href="/villagers/[villager]/"
      as={`/villagers/${villager.name.toLowerCase()}`}
      passHref
    >
      <a
        id={active ? "active" : null}
        className={`${styles.Villager} ${
          active ? styles.VillagerActive : ""
        } radius--m smooth`}
        style={{
          "--bg": "#" + villager.title_color,
          "--type": "#" + villager.text_color,
        }}
        title={`More details about ${villager.name}`}
      >
        <figure className="oomph__v--l padding__all--l type__align--center radius--m">
          <img
            alt={`Featured image for ${villager.name}`}
            loading="lazy"
            src={villager.image_url}
            height="120"
            width="120"
          />
          <figcaption>
            <h2>{villager.name}</h2>
            <span className="flow--flex flow__align--h-center flow__align--v-center oomph__h--s padding__all--s">
              <CalendarEvent size={24} />
              <p className="type__weight--semibold">
                {villager.birthday_month} {villager.birthday_day}
              </p>
            </span>
          </figcaption>
        </figure>
        {active && <Confetti height={442} width={360} numberOfPieces={100} />}
      </a>
    </Link>
  );
};
export default Villager;
