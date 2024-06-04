import { defineConfig } from 'drizzle-kit';
import { DB_URL } from './src/config';

export default defineConfig({
    driver: "pg",
    schema: "./src/db/schema/*",
    out: "./src/db/migrations",
    dbCredentials: {
        connectionString: DB_URL as string,
    },
    verbose: true,
    strict: true
});