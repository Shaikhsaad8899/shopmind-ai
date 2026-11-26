import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().min(1).max(65535)
    .default(4000),

  STOREFRONT_URL: z.string().url(),

  ADMIN_URL: z.string().url(),

  MONGODB_URI: z.string().min(1),

  REDIS_URL: z.string().min(1),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    "Invalid environment configuration:",
    result.error.issues.map(({ path, message }) => ({
      path,
      message,
    }))
  );

  process.exit(1);
}

export const env = result.data;