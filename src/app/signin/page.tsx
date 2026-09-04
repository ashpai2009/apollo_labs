import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Apollo Labs.",
};

export default function SignInPage() {
  return (
    <AuthLayout
      eyebrow="Member Access"
      title="Sign in to Apollo Labs."
      statement="Your work, your drafts, and the reviews waiting on them."
      footer={
        <p className="text-sm text-muted">
          No account yet?{" "}
          <Link
            href="/join"
            className="link-reveal text-paper transition-colors hover:text-signal-bright"
          >
            Join Apollo
          </Link>
        </p>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
}
