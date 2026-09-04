import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout, MockNotice } from "@/components/auth/AuthLayout";
import { Field } from "@/components/ui/Field";
import { Button, Arrow } from "@/components/ui/Button";

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
      <form className="mt-10 flex flex-col gap-7" aria-describedby="join-mock">
        <Field label="Full name" name="name" placeholder="Your name" autoComplete="name" />
        <Field label="Email" type="email" name="email" placeholder="you@school.edu" autoComplete="email" />
        <Field
          label="Password"
          type="password"
          name="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
        <Field
          label="Graduation year"
          type="number"
          name="graduationYear"
          placeholder="2028"
          min={2024}
          max={2040}
        />
        <div className="mt-2">
          <Button type="button" className="group w-full">
            Create Account <Arrow />
          </Button>
        </div>
        <div id="join-mock">
          <MockNotice />
        </div>
      </form>
    </AuthLayout>
  );
}
