"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "~/env";

export const createSupabaseClient = () => {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
};
