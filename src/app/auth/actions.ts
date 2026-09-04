"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  errors?: Partial<Record<"name" | "email" | "password" | "graduationYear" | "confirmPassword", string>>;
  message?: string;
  success?: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

async function siteOrigin() {
  const requestHeaders = await headers();
  return requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export async function signUp(_state: AuthState, formData: FormData): Promise<AuthState> {
  const name = value(formData, "name");
  const email = value(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const graduationYearRaw = value(formData, "graduationYear");
  const graduationYear = Number(graduationYearRaw);
  const errors: NonNullable<AuthState["errors"]> = {};

  if (name.length < 2) errors.name = "Enter your full name.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (password.length < 8) errors.password = "Use at least 8 characters.";
  if (!Number.isInteger(graduationYear) || graduationYear < 2024 || graduationYear > 2040) {
    errors.graduationYear = "Enter a graduation year from 2024 to 2040.";
  }
  if (Object.keys(errors).length) return { errors };

  const supabase = await createClient();
  const origin = await siteOrigin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name, graduation_year: graduationYear },
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) return { message: error.message };
  if (data.session) redirect("/dashboard");

  return {
    success: true,
    message: "Check your email to confirm your account, then sign in.",
  };
}

export async function signIn(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = value(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const errors: NonNullable<AuthState["errors"]> = {};

  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  if (Object.keys(errors).length) return { errors };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { message: "The email or password you entered is incorrect." };

  redirect("/dashboard");
}

export async function requestPasswordReset(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = value(formData, "email").toLowerCase();
  if (!emailPattern.test(email)) return { errors: { email: "Enter a valid email address." } };

  const supabase = await createClient();
  const origin = await siteOrigin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/update-password`,
  });

  if (error) return { message: error.message };
  return {
    success: true,
    message: "If an account exists for that email, a reset link is on its way.",
  };
}

export async function updatePassword(_state: AuthState, formData: FormData): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const errors: NonNullable<AuthState["errors"]> = {};

  if (password.length < 8) errors.password = "Use at least 8 characters.";
  if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
  if (Object.keys(errors).length) return { errors };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { message: error.message };

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
