import { redirect } from "next/navigation";
import Router from "next/router";
export default function Home({ params }) {
  // return null;
  if (typeof window !== "undefined") {
    Router.push("/lancamentos");
  }
  return (
    <>
      <>página inicio</>
    </>
  );
  // redirect();
  // ...
}
