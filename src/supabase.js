import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://existcbcknpzvxkhtkhw.supabase.co";
const supabaseKey = "sb_publishable_tvp6SfMqlAMWy5wHybHd8Q_ztyCeOuI";

export const supabase = createClient(supabaseUrl, supabaseKey);