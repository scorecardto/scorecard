// nextjs api handler

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { installDate, browser, os, engine, device } = req.body;

  const id = Math.random().toString(36).substring(2, 15);

  res.status(200).json({ status: "ok", id });
}
