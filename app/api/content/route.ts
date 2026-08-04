import { NextResponse } from "next/server";
import { createContentItem, getContentItems, type ContentInput } from "../../../db/content";
import { getAdminUser } from "../../admin-auth";

export const dynamic = "force-dynamic";

async function canManage() {
  return Boolean(await getAdminUser());
}

function parseInput(body: unknown): ContentInput | null {
  if (!body || typeof body !== "object") return null;
  const value = body as Record<string, unknown>;
  if (value.type !== "product" && value.type !== "news") return null;
  const required = ["title", "slug", "summary", "category", "imageUrl", "publishedAt"];
  if (required.some((key) => typeof value[key] !== "string" || !String(value[key]).trim())) return null;
  return {
    type: value.type,
    title: String(value.title).trim(),
    slug: String(value.slug).trim(),
    summary: String(value.summary).trim(),
    body: typeof value.body === "string" && value.body.trim() ? value.body.trim() : String(value.summary).trim(),
    category: String(value.category).trim(),
    imageUrl: String(value.imageUrl).trim(),
    publishedAt: String(value.publishedAt),
    featured: Boolean(value.featured),
    sortOrder: Number(value.sortOrder) || 0,
  };
}

export async function GET() {
  return NextResponse.json(await getContentItems());
}

export async function POST(request: Request) {
  if (!(await canManage())) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const input = parseInput(await request.json());
  if (!input) return NextResponse.json({ error: "Please complete all required fields" }, { status: 400 });
  try {
    return NextResponse.json(await createContentItem(input), { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save this item" }, { status: 500 });
  }
}
