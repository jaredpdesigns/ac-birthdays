import { Home } from "tabler-icons-react";
import Head from "next/head";
import Header from "@components/Header";
import Layout from "@components/Layout";
import Link from "next/link";
export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>{`Uh-Oh • Animal Crossing Birthdays`}</title>
        <meta
          key="og:title"
          property="og:title"
          content={`Uh-Oh • Animal Crossing Birthdays`}
        />
        <meta
          key="description"
          name="description"
          content={`Oops looks like we can’t find this page`}
        />
        <meta
          key="og:description"
          property="og:description"
          content={`Oops looks like we can’t find this page`}
        />
        <link
          key="canonical"
          href={`https://ac-birthdays.netlify.app/404`}
          rel="canonical"
        />
      </Head>
      <Header>
        <Link href="/" passHref>
          <a
            className="flow--inline flow__align--h-center flow__align--v-center flow__size--h-xl flow__size--w-xl smooth type__size--m-l"
            title="Return Home"
          >
            <Home size={24} />
          </a>
        </Link>
      </Header>
      <main className="oomph__v--m padding__all--l type__align--center width__l">
        <h1>Uh-Oh</h1>
        <hr/>
        <p>Oops looks like we can’t find this page</p>
      </main>
    </Layout>
  );
}
