import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout, MockNotice } from "@/components/auth/AuthLayout";
import { Field } from "@/components/ui/Field";
import { Button, Arrow } from "@/components/ui/Button";

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
      <form className="mt-10 flex flex-col gap-7" aria-describedby="signin-mock">
        <Field label="Email" type="email" name="email" placeholder="you@school.edu" autoComplete="email" />
        <Field label="Password" type="password" name="password" placeholder="••••••••" autoComplete="current-password" />
        <div className="mt-2 flex flex-col gap-4">
          <Button type="button" className="group w-full">
            Sign In <Arrow />
          </Button>
          <Link
            href="/signin"
            className="link-reveal self-start text-[0.8125rem] text-muted transition-colors hover:text-paper"
          >
            Forgot your password?
          </Link>
        </div>
        <div id="signin-mock">
          <MockNotice />
        </div>
      </form>
    </AuthLayout>
  );
}
