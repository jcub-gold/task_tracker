import { NextRequest, NextResponse } from "next/server";
import { readDayRecord, writeDayRecord } from "@/lib/serverStorage";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;
  return NextResponse.json(readDayRecord(date));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;
  const body = await req.json();
  const record = { date, completedTaskIds: body.completedTaskIds ?? [] };
  writeDayRecord(record);
  return NextResponse.json(record);
}
