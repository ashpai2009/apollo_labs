import type { Metadata } from "next";
import { ComingSoon } from "@/components/chrome/ComingSoon";

export const metadata: Metadata = { title: "Sign In" };

export default function Page() {
  return (
    <ComingSoon
      index="04"
      title="Sign In"
      description="Member sign-in for Apollo Labs. Accounts are not connected yet — this build is a design prototype with mock data throughout."
    />
  );
}
