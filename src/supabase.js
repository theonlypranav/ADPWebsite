// import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://hzornfyzofcwqtyeqgfl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6b3JuZnl6b2Zjd3F0eWVxZ2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxMDIxMzIsImV4cCI6MjAzODY3ODEzMn0.hZgjlUbkoquj3U_za7dji4FE9eiGMMHFWhcWIVQxVWk",
  );

export default supabase;

