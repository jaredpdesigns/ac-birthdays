import { useEffect } from "react";
import Head from "next/head";
import Footer from "@components/Footer";

const Layout = (props) => {
  useEffect(() => {
    document.documentElement.lang = "en-us";
  });
  return (
    <div className="App">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Animal-Crossing Birthdays</title>
        <meta
          key="description"
          name="description"
          content="A fun exploration of the Nookipedia API"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="keywords"
          content="animal-crossing, animal-crossing new horizons, animal-crossing birthdays, jared pendergraft, jared pendergraft designs, design, website, graphic design hawaii, web design hawaii, graphic design maui, web design maui"
        />
        <meta
          key="og:description"
          property="og:description"
          content="A fun exploration of the Nookipedia API"
        />
        <meta
          property="og:image"
          content="https://ac-birthdays.netlify.app/img/social.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Animal-Crossing Birthdays" />
        <meta
          key="og:title"
          property="og:title"
          content="Animal-Crossing Birthdays"
        />
        <meta property="og:type" content="website" />
        <meta
          key="og:url"
          property="og:url"
          content="https://ac-birthdays.netlify.app/"
        />
        <meta name="twitter:card" content="photo" />
        <meta name="twitter:creator" content="jaredpdesigns" />
        <meta
          key="twitter:rul"
          property="twitter:url"
          content="https://ac-birthdays.netlify.app/"
        />

        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="alternate icon" type="image/x-icon" href="favicon.ico" />
        <link
          key="canonical"
          href="https://ac-birthdays.netlify.app/"
          rel="canonical"
        />
        <link href="https://api.fontshare.com/" rel="preconnect" />
        <link
          href="https://api.fontshare.com/css?f[]=excon@400,500&f[]=bespoke-slab@300,301,500,501&display=swap"
          rel="stylesheet"
        />
      </Head>
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
