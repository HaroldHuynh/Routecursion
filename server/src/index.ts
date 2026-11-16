import app from "./app";
import { checkDatabaseConnection } from "./lib/check-database-connection";

const port = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await checkDatabaseConnection();
    console.log("Connected to Supabase PostgreSQL");

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error: unknown) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

void startServer();
