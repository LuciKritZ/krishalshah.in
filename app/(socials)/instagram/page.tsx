import { redirect } from "next/navigation";

import { siteConfig } from "@/config";

export default function InstagramRedirect() {
  redirect(siteConfig.links.instagram);
}
