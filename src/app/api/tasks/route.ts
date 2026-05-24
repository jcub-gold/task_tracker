import { NextRequest, NextResponse } from "next/server";
import { readTasks, writeTasks } from "@/lib/serverStorage";
import { GlobalTask } from "@/lib/types";

export async function GET() {
  return NextResponse.json(readTasks());
}

export async function PUT(req: NextRequest) {
  const tasks = (await req.json()) as GlobalTask[];
  writeTasks(tasks);
  return NextResponse.json(tasks);
}
