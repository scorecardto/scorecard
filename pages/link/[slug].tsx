import Link from "next/link";
import { useRouter } from "next/router";
import Redirect from "../../components/core/util/Redirect";

const LINKS: { [key: string]: string } = {
  chrome:
    "https://chrome.google.com/webstore/detail/scorecard-gradebook-viewe/kdcaikhoeplkmicnkjflbbpchjoadaki",
};

export default function LinkPage() {
  const router = useRouter();
  const slug: string = router.query["slug"] as string;

  const link = LINKS[slug];

  if (link && typeof window !== undefined) {
    return <Redirect to={link} />;
  } else if (typeof window !== undefined) {
    return <Redirect to={"/"} />;
  } else {
    return <Link href="/">Click to go to the home page</Link>;
  }
}
