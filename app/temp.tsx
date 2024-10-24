'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus } from 'lucide-react'

// Mock data for demonstration
const initialCars = [
  { id: 1, registrationNumber: 'ABC123', brand: 'Toyota', model: 'Corolla', notes: 'Regular maintenance up to date' },
  { id: 2, registrationNumber: 'XYZ789', brand: 'Honda', model: 'Civic', notes: 'New tires needed' },
  { id: 3, registrationNumber: 'DEF456', brand: 'Ford', model: 'Focus', notes: 'Recently serviced' },
]

export default function CarList() {
  const [cars, setCars] = useState(initialCars)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    // In a real application, you would make an API call here
    setCars(cars.filter(car => car.id !== id))
  }

  const fetchCars = async () => {
    try {
      setLoading(true)

      const responses = await fetch('/api')

      if (!responses.ok) {
        throw new Error('faile to fetch')
      }

      const data = await responses.json();
      console.log(data)
   
    } catch(error) {
      setError(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  })

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
      <Table>
        <TableCaption>A list of all registered cars.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Registration Number</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell className="font-medium">{car.registrationNumber}</TableCell>
              <TableCell>{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.notes}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => alert(`View car ${car.id}`)}>
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert(`Edit car ${car.id}`)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(car.id)} className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}