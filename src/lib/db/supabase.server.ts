import { createClient } from "@supabase/supabase-js";
import { env } from "~/env";

export const createSupabaseServerClient = () => {
  const supabse = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  return supabse;
};
