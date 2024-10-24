"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { storeCar } from "@/action/car-actions";
import { useActionState } from "react";

export default function AddCarForm() {
    const [state, formAction] = useActionState(storeCar, { message: "" });

    return (
        <form action={formAction}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="col-span-full">
                    <Input placeholder="Enter car registration number" name="registration_number" required  />
                </div>

                <div className="col-span-full">
                    <Input placeholder="Enter car brand" name="brand" required  />
                </div>

                <div className="col-span-full">
                    <Input placeholder="Enter car model" name="model"  />
                </div>

                <div className="col-span-full">
                    <Input placeholder="Enter any additional notes" name="notes"  />
                </div>
                
                <div className="col-span-full">
                    <SubmitButton>Save</SubmitButton>
                </div>
                

                <div>{state?.message}</div>
   
            </div>
        </form>
    );
}
