import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import { getVillagers, getExtra, getVillager } from "@components/API";
import Loading from "@components/Loading";
import Header from "@components/Header";
import Layout from "@components/Layout";
import styles from "./Detail.module.scss";
import { CalendarEvent, Hanger, Marquee, Paint } from "tabler-icons-react";

const Detail = ({ clothing, flooring, villager, wallpaper }) => {
  const router = useRouter();

  if (!router.isFallback && !villager) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Header />
      {router.isFallback ? (
        <section className="padding__all--l type__align--center">
          <Loading />
        </section>
      ) : (
        <main
          className={`${styles.Detail}`}
          style={{
            "--bg": "#" + villager.title_color,
            "--type": "#" + villager.text_color,
          }}
        >
          <Head>
            <title>
              {`${villager.birthday_month} ${villager.birthday_day} • ${villager.name} • Animal Crossing Birthdays`}
            </title>
            <meta
              key="og:title"
              property="og:title"
              content={`${villager.birthday_month} ${villager.birthday_day} • ${villager.name} • Animal Crossing Birthdays`}
            />
            <meta
              key="description"
              name="description"
              content={`“${villager.quote.replace(".", "")}”`}
            />
            <meta
              key="og:description"
              property="og:description"
              content={`“${villager.quote.replace(".", "")}”`}
            />
            <meta
              key="og:url"
              property="og:url"
              content={`https://ac-birthdays.netlify.app/villagers/${villager.name.toLowerCase()}`}
            />
            <meta
              key="twitter:url"
              property="twitter:url"
              content={`https://ac-birthdays.netlify.app/villagers/${villager.name.toLowerCase()}`}
            />
            <link
              key="canonical"
              href={`https://ac-birthdays.netlify.app/villagers/${villager.name.toLowerCase()}`}
              rel="canonical"
            />
          </Head>
          <article>
            <section
              className={`${styles.DetailVillager} flow--grid flow__align--h-center flow__align--v-center flow__grid--gap-l padding__all--l width__l`}
            >
              <figure
                className="padding__left--l padding__right--l padding__top--l type__align--center"
                style={{
                  backgroundImage: `url(${villager.nh_details.house_exterior_url})`,
                }}
              >
                <img
                  alt={`Featured image of ${villager.name}`}
                  loading="lazy"
                  src={villager.image_url}
                  height="240"
                  width="240"
                />
              </figure>
              <figcaption className="type__align--center">
                <h1>{villager.name}</h1>
                <span className="flow--flex flow__align--h-center flow__align--v-center oomph__h--s padding__all--m">
                  <CalendarEvent size={24} />
                  <p className="type__weight--semibold">
                    {villager.birthday_month} {villager.birthday_day}
                  </p>
                </span>
                <blockquote className="flow--inline flow__align--v-center oomph__h--s padding__all--s radius--s">
                  <p>{villager.nh_details.quote.replace(".", "")}</p>
                </blockquote>
              </figcaption>
            </section>
            <section
              className={`${styles.DetailExtras} flow--grid flow__align--h-center flow__align--v-start flow__grid--columns-auto flow__grid--gap-l padding__all--l type__align--center width__xl`}
            >
              {clothing &&
                clothing.variations
                  .filter(
                    (item) =>
                      item.variation === villager.nh_details.clothing_variation
                  )
                  .map((item, index) => (
                    <section className="oomph__v--m" key={index}>
                      <span className="flow--flex flow__align--h-center flow__align--v-center oomph__h--s type__align--center">
                        <Hanger size={24} />
                        <h2>Favorite Outfit</h2>
                      </span>
                      <figure className="flow--inline flow__direction--column flow__align--h-center flow__align--v-center oomph__v--m padding__all--l radius--s shadow type__align--center">
                        <img
                          alt={`${villager.name}‘s favorite outfit`}
                          loading="lazy"
                          src={item.image_url}
                          height="128"
                          width="128"
                        />
                        <figcaption>
                          <p>{clothing.name}</p>
                        </figcaption>
                      </figure>
                    </section>
                  ))}
              {flooring && (
                <section className="oomph__v--m">
                  <span className="flow--flex flow__align--h-center flow__align--v-center oomph__h--s type__align--center">
                    <Marquee size={24} />
                    <h2>House Flooring</h2>
                  </span>
                  <figure className="flow--inline flow__direction--column flow__align--h-center flow__align--v-center oomph__v--m padding__all--l radius--s shadow type__align--center">
                    <img
                      alt={`${villager.name}‘s house flooring`}
                      loading="lazy"
                      src={flooring.image_url}
                      height="128"
                      width="128"
                    />
                    <figcaption>
                      <p>{flooring.name}</p>
                    </figcaption>
                  </figure>
                </section>
              )}
              {wallpaper && (
                <section className="oomph__v--m">
                  <span className="flow--flex flow__align--h-center flow__align--v-center oomph__h--s type__align--center">
                    <Paint size={24} />
                    <h2>House Wallpaper</h2>
                  </span>
                  <figure className="flow--inline flow__direction--column flow__align--h-center flow__align--v-center oomph__v--m padding__all--l radius--s shadow type__align--center">
                    <img
                      alt={`${villager.name}‘s house wallpaper`}
                      loading="lazy"
                      src={wallpaper.image_url}
                      height="128"
                      width="128"
                    />
                    <figcaption>
                      <p>{wallpaper.name}</p>
                    </figcaption>
                  </figure>
                </section>
              )}
            </section>
          </article>
        </main>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const villager = await getVillager(context.query.slug);
  if (!villager) {
    return {
      notFound: true,
    };
  }
  const clothing = await getExtra(
    `nh/clothing/${villager.clothing}?thumbsize=256`
  );
  const flooring = await getExtra(
    `nh/interior/${villager.nh_details.house_flooring}?thumbsize=256`
  );
  const wallpaper = await getExtra(
    `nh/interior/${villager.nh_details.house_wallpaper}?thumbsize=256`
  );
  return {
    props: {
      clothing: clothing,
      flooring: flooring,
      villager: villager,
      wallpaper: wallpaper,
    },
  };
}
export default Detail;
