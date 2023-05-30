import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xntlptjhmiswskncddwy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhudGxwdGpobWlzd3NrbmNkZHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0MTA2MTUsImV4cCI6MTk5OTk4NjYxNX0.WnxT09BuWLVdEcdSHrve0uib4_Zzu7l1VUY99PI8UaE";

const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };
