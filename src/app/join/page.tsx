import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { JoinForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Join Apollo",
  description: "Join Apollo Labs and start publishing your research.",
};

export default function JoinPage() {
  return (
    <AuthLayout
      eyebrow="Create Account"
      title="Start something worth publishing."
      statement="Bring an idea. Leave with something that has your name on it."
      description={
        <p>
          Create your Apollo account with your name, email, password, and
          graduation year. Confirm your email if prompted, then enter your
          member workspace.
        </p>
      }
      accessDetails={[
        { label: "Verification", value: "Email may be required" },
        { label: "Continue to", value: "Member workspace" },
      ]}
      workspaceItems={["Project overview", "Team directory", "Account snapshot"]}
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
