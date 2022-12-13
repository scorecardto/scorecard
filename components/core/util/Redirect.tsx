import { useRouter } from "next/router";
import React from "react";

export default function Redirect(props: { to: string }) {
  const router = useRouter();

  React.useEffect(() => {
    router.push(props.to);
  }, [props.to, router]);

  return <></>;
}
