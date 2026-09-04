import type { Metadata } from "next";
import { ComingSoon } from "@/components/chrome/ComingSoon";

export const metadata: Metadata = { title: "The Archive" };

export default function Page() {
  return (
    <ComingSoon
      index="01"
      title="The Archive"
      description="The complete Apollo Labs archive — search, discipline and type filters, and every published project in one place. The selected work on the homepage is drawn from it."
    />
  );
}
