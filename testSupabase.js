import * as dotenv from 'dotenv';
dotenv.config();
const {SUPABASE_URL} = process.env
import { createClient } from '@supabase/supabase-js';

console.log(SUPABASE_URL);

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// export const supabase = createClient(supabaseUrl, supabaseKey);

// console.log(supabaseUrl);
// console.log(supabaseKey);