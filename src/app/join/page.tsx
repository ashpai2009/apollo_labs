import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { JoinForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Join Apollo",
  description: "Create an Apollo Labs account and start publishing your work.",
};

export default function JoinPage() {
  return (
    <AuthLayout
      eyebrow="Create Account"
      title="Start something worth publishing."
      statement="Bring an idea. Leave with something that has your name on it."
      footer={
        <p className="text-sm text-muted">
          Already a member?{" "}
          <Link
            href="/signin"
            className="link-reveal text-paper transition-colors hover:text-signal-bright"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <JoinForm />
    </AuthLayout>
  );
}
