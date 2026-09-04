import type { Metadata } from "next";
import { ComingSoon } from "@/components/chrome/ComingSoon";

export const metadata: Metadata = { title: "About Apollo Labs" };

export default function Page() {
  return (
    <ComingSoon
      index="02"
      title="About Apollo Labs"
      description="Why Apollo Labs exists, how students participate, and how we think about mentoring, collaboration, and publishing student work properly."
    />
  );
}
