import type { Metadata } from "next";
import { requireAdminUser } from "../admin-auth";
import { getContentItems } from "../../db/content";
import AdminManager from "./AdminManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content manager",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireAdminUser();
  const items = await getContentItems();

  return <AdminManager initialItems={items} userName={user.displayName} />;
}
