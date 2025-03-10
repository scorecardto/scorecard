import Link from "next/link";
import { useRouter } from "next/router";
import Redirect from "../../components/core/util/Redirect";

export const LINKS: { [key: string]: string } = {
  chrome:
    "https://chrome.google.com/webstore/detail/scorecard-gradebook-viewe/kdcaikhoeplkmicnkjflbbpchjoadaki",
  "delete-data-android":
    "https://docs.google.com/forms/d/e/1FAIpQLSdQ-BPnOLU8w7uQdboTKD-fjmVU0Ik0gaucqwRhH9zO084QHA/viewform?usp=sf_link",
  ios: "https://apps.apple.com/us/app/scorecard-gradebook-viewer/id6476124418",
  apple:
    "https://apps.apple.com/us/app/scorecard-gradebook-viewer/id6476124418",
  iphone:
    "https://apps.apple.com/us/app/scorecard-gradebook-viewer/id6476124418",
  android: "https://forms.gle/fdE4WfnTkxgJv8wF9",
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
