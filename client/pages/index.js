import Head from "next/head";
import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {
  const words = {
    welcomeMsg:
      "Welcome to Survey Me. The place for your business to create, take and view surveys",
  };
  return (
    <div className="mainContainer">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="mainView">
        <h3 className="welcomeMsg">{words.welcomeMsg}</h3>
        <div className="bigLinks">
          <Link href="./take">Take a Survey</Link>
          <Link href="./create">Create a Survey</Link>
          <Link href="./view">View your Surveys</Link>
        </div>
      </div>
    </div>
  );
}
