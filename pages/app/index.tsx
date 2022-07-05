import type { NextPage } from "next";
import { useState } from "react";

const App: NextPage = () => {
  const [data, setData] = useState(undefined);

  if (typeof window !== "undefined") {
    chrome.runtime
      .sendMessage("fkpgodekaimcnfknnkgkkdclfodblifl", {
        message: "hello world!",
      })
      .then((response) => {
        setData(response);
      });
  }

  return (
    <div>
      {!data && <p>Loading...</p>}
      {data && <p>{data}</p>}
    </div>
  );
};

export default App;
