import { redirect } from "next/navigation";

import { siteConfig } from "@/config";

export default function XRedirect() {
  redirect(siteConfig.links.twitter);
}
