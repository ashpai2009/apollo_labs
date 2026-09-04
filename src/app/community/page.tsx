import type { Metadata } from "next";
import { ComingSoon } from "@/components/chrome/ComingSoon";

export const metadata: Metadata = { title: "The Community" };

export default function Page() {
  return (
    <ComingSoon
      index="03"
      title="The Community"
      description="What membership looks like, how projects develop from a first idea to a published piece, and how students get their work reviewed and shared."
    />
  );
}
