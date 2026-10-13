import React from "react";
import { useQuery } from "@tanstack/react-query";
import EmployeeTable from "./Components/EmployeeTable";
import EmployeeModal from "./Components/EmployeeModal";
export const backendUrl = import.meta.env.VITE_API_URL;

function App() {
  async function fetchEmployeeDetails() {
    const res = await fetch(backendUrl);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }

    return data;
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["employee_details"],
    queryFn: fetchEmployeeDetails,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7x1 mx-auto space-y-8">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Employee Management System
        </h1>

        <EmployeeModal type="add">
          <button className="px-5 py-2 rounded-xl bg-blue-100 text-gray-700">
            Add Employee
          </button>
        </EmployeeModal>
      </div>
        <EmployeeTable data={data} />
      </div>
    </div>
  );
}

export default App;
