import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Errors() {
  const router = useRouter();

  useEffect(() => {
    router.push("/app");
  }, []);

  return <div></div>;
}
