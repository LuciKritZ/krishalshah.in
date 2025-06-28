import { redirect } from "next/navigation";

import { siteConfig } from "@/config";

export default function GitHubRedirect() {
  redirect(siteConfig.links.github);
}
