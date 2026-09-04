import type { Metadata } from "next";
import { ComingSoon } from "@/components/chrome/ComingSoon";

export const metadata: Metadata = { title: "Join Apollo" };

export default function Page() {
  return (
    <ComingSoon
      index="05"
      title="Join Apollo"
      description="Membership applications for students who want somewhere serious to build and publish. The form is not connected yet in this prototype build."
    />
  );
}
