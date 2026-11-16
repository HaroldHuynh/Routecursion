import { supabase } from "./supabase";

export async function checkDatabaseConnection(): Promise<void> {
  const { data, error } = await supabase
    .from("health_check")
    .select("status")
    .eq("id", 1)
    .single();

  if (error) {
    throw new Error(`Supabase database check failed: ${error.message}`);
  }

  if (data.status !== "ok") {
    throw new Error("Supabase returned an unexpected health-check value");
  }
}
