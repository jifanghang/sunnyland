import type { Metadata } from "next";
import { requireChatGPTUser } from "../chatgpt-auth";
import { getContentItems } from "../../db/content";
import AdminManager from "./AdminManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content manager",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = process.env.NODE_ENV !== "production"
    ? { displayName: "Local editor", email: "preview@sunnyland.local", fullName: "Local editor" }
    : await requireChatGPTUser("/admin");
  const items = await getContentItems();

  return <AdminManager initialItems={items} userName={user.displayName} />;
}
