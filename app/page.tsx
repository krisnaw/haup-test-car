import { CarTable } from "@/components/car-table";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  const { data: cars, error } = await supabase.from("cars").select("*");

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Car List</h1>
        <Link href="/cars/create" passHref>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Car
          </Button>
        </Link>
      </div>
      <CarTable cars={cars} />
    </div>
  );
}
