import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const KEY = "tnm:cases_submitted_total";

export async function GET() {
  const count = (await redis.get<number>(KEY)) ?? 0;
  return NextResponse.json({ count });
}

export async function POST() {
  const count = await redis.incr(KEY);
  return NextResponse.json({ count });
}
