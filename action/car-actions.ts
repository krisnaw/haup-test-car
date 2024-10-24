"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function storeCar(
  prevState: { message: string },
  formData: FormData
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cars")
    .insert([
      {
        registration_number: formData.get("registration_number"),
        brand: formData.get("brand"),
        model: formData.get("model"),
        notes: formData.get("notes"),
      },
    ])
    .select()
    .single();

  revalidatePath(`/cars/${data.id}`);
  redirect(`/cars/${data.id}`);
}

export async function updateCar(
  prevState: { message: string },
  formData: FormData
) {
  const supabase = await createClient();

  console.log("update");

  const { data, error } = await supabase
    .from("cars")
    .update({
      registration_number: formData.get("registration_number"),
      brand: formData.get("brand"),
      model: formData.get("model"),
      notes: formData.get("notes"),
    })
    .eq("id", formData.get("id") as string)
    .select()
    .single();

  if (error) {
    console.error(error);
    return {
      message: error.message,
    };
  }

  revalidatePath(`/cars/${data.id}`);
  redirect(`/cars/${data.id}`);
}

export async function deleteCar(carId) {
  const supabase = await createClient();
  const { error } = await supabase.from("cars").delete().eq("id", carId);

  console.log(carId);

  revalidatePath(`/`);

  redirect(`/`);
}
