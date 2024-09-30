import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  if (data.type === "post") {
    try {
      const r = await axios.post(
        "https://api.scorecardgrades.com" + data.pathname,
        data.data
      );

      res.status(200).send(r.data);
      return;
    } catch (e: any) {
      res.status(e.response.status).send(e.response.data);
      return;
    }
  }

  res.status(400).send("Bad request");
}
