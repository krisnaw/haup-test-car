import EditCarForm from "@/components/edit-car-form";
import { createClient } from "@/utils/supabase/server";


export default async function Page({ params }: { params: { id: string } }) {

  const { id } =  params;
  const supabase = await createClient();

  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();


  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Car</h1>
      <EditCarForm car={car} />
    </div>
  )
}