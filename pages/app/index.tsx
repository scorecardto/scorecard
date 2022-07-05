import type { NextPage } from "next";
import { useState } from "react";

const App: NextPage = () => {
  const [data, setData] = useState(undefined);

  if (typeof window !== "undefined") {
    try {
      chrome.runtime.sendMessage(
        "fkpgodekaimcnfknnkgkkdclfodblifl",
        {
          message: "hello world!",
        },
        (response) => {
          setData(response);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {!data && <p>Loading...</p>}
      {data && <p>{data}</p>}
    </div>
  );
};

export default App;
