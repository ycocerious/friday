import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export const createUser = async () => {
  await db.insert(users).values({
    email: "test@test.com",
    name: "Test User",
    role: "CREATOR",
    password: "password",
  });
};

await createUser();
process.exit(0);
