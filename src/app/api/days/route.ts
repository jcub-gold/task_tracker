import { NextResponse } from "next/server";
import { readAllDayRecords } from "@/lib/serverStorage";

export async function GET() {
  return NextResponse.json(readAllDayRecords());
}
