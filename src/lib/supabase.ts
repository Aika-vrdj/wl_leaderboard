import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://twyfuamtvdbtbnvbalbe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3eWZ1YW10dmRidGJudmJhbGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NzY2OTUsImV4cCI6MjA1MjA1MjY5NX0.WElpewiIfSNHNA11YQLfmyo93Jyn8fHg5J_Hdf5N0_A';

export const supabase = createClient(supabaseUrl, supabaseKey);