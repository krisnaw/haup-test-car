"use client";

import { Input } from "@/components/ui/input";
import { Car } from "./carType";
import { SubmitButton } from "./submit-button";
import { updateCar } from "@/action/car-actions";
import { useActionState } from "react";

export default function EditCarForm({ car }: { car: Car }) {
    const [state, formAction] = useActionState(updateCar, { message: "" });

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={car.id} />
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                    <Input placeholder="Enter car registration number" name="registration_number" required defaultValue={car.registration_number} />
                </div>

                <div className="col-span-full">
                    <Input placeholder="Enter car brand" name="brand" required defaultValue={car.brand} />
                </div>

                <div className="col-span-full">
                    <Input placeholder="Enter car model" name="model" defaultValue={car.model} />
                </div>

                <div className="col-span-full">
                    <Input placeholder="Enter any additional notes" name="notes" defaultValue={car.notes} />
                </div>
                
                <div className="col-span-full">
                    <SubmitButton>Save</SubmitButton>
                </div>

                <div>{state?.message}</div>
   
            </div>
        </form>
    );
}
