import { redirect } from "next/navigation";

import { siteConfig } from "@/config";

export default function LinkedInRedirect() {
  redirect(siteConfig.links.linkedin);
}
