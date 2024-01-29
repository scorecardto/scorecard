import { NextApiRequest, NextApiResponse } from "next";
import districtsJson from "../../lib/districts.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const districts = districtsJson.data.districts.map((district) => {
    const url =
      district.accounts["student"].url || district.accounts["Student"]?.url;
    return {
      pinned: district.name === "Austin ISD",
      name: district.name,
      url: url ? new URL(url).hostname : null,
    };
  });
  res.status(200).json({
    lastUpdated: districtsJson.LAST_UPDATED,
    districts,
  });
}
