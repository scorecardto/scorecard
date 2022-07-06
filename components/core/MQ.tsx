import { useMediaQuery } from "../hooks/hooks";

export default function MQ(props: {
  query: string;
  children?: any;
  invert?: boolean;
}) {
  const query = useMediaQuery(props.query, props.invert);

  return <>{query && props.children}</>;
}
