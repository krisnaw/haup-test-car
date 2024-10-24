import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export interface Car {
  id: number;
  registration_number: string;
  brand: string;
  model: string;
  notes?: string | null;
}

// Ensure these environment variables are set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  const { data: cars, error } = supabase.from("cars").select("*");

  console.log(cars)
  return NextResponse.json({
    status: 'success',
  }, { status: 200 });
  
}

// export async function POST(params:type) {

// }

// export async function PUT(params:type) {

// }

// export async function DELETE(params:type) {

// }
