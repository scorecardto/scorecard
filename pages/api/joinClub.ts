import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  if (data.special === "onboardClub") {
    try {
      const r = await axios.post(
        "https://api.scorecardgrades.com/v1/clubs/onboardClub",
        data
      );

      res.status(200).send(r.data);
    } catch (e: any) {
      res.status(e.response.status).send(e.response.data);
    }
  } else {
    try {
      const r = await axios.post(
        "https://api.scorecardgrades.com/v1/clubs/public/join",
        data
      );

      res.status(200).send(r.data);
    } catch (e: any) {
      res.status(e.response.status).send(e.response.data);
    }
  }
}
