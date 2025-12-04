import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ddoucwlbhlgctdegrmaz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkb3Vjd2xiaGxnY3RkZWdybWF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzA1NzMsImV4cCI6MjA3OTU0NjU3M30.6mBVe7FcogDDxVCUvbhyaoSpU8Na10ExVwZcuPPmmFU"
);
