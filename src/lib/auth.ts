import { atomWithStorage } from "jotai/utils";
import { z } from "zod";
import { userRoleSchema } from "~/server/db/schema";

// 1. Define schema for user
const userSchema = z
  .object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().nullable(),
    role: userRoleSchema,
  })
  .nullable()
  .catch(null);

type PersistedUser = z.infer<typeof userSchema>;

// 2. Define initial value
const fallbackUser = null satisfies PersistedUser;

// 3. Define storage key
const userKey = "user";

// 4. Create atom with storage
export const userAtom = atomWithStorage<PersistedUser>(userKey, fallbackUser, {
  setItem: (key, value) =>
    localStorage.setItem(key, JSON.stringify(userSchema.parse(value))),
  getItem: (key) =>
    userSchema.parse(JSON.parse(localStorage.getItem(key) ?? "null")),
  removeItem: (key) => localStorage.removeItem(key),
});
