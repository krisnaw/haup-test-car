import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";

import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import DeleteCarButton from "@/components/delete-car-button";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
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
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Car Details</CardTitle>
          <CardDescription>View information about this car</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-medium text-gray-500">Registration Number</dt>
              <dd className="mt-1 text-gray-900">
                {car.registration_number}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Brand</dt>
              <dd className="mt-1 text-gray-900">{car.brand}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Model</dt>
              <dd className="mt-1 text-gray-900">{car.model}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-gray-900">{car.notes}</dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/cars/${car.id}/edit`}>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>

          <DeleteCarButton carId={car.id} />
        </CardFooter>
      </Card>
    </div>
  );
}
