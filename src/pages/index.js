import { redirect } from "next/navigation";
import Router from "next/router";
import ContextLogin from "@/services/contextLogin";
import { useContext, useState } from "react";
export default function Home({ params }) {
  const [logado, setLogado] = useContext(ContextLogin);
  // return null;

  if (typeof window !== "undefined") {
    if (logado !== 0) {
      console.log(logado);
      Router.push("/projetos");
    } else {
      Router.push("/login");
    }
  }
  return (
    <>
      <>carregando....</>
    </>
  );
  // redirect();
  // ...
}
