import React from 'react';
import { useQuery } from '@tanstack/react-query';
import EmployeeTable from './Components/EmployeeTable';
import EmployeeModal from './Components/EmployeeModal';
export const backendUrl = "http://localhost:3000/api/employee";

function App() {

  async function fetchEmployeeDetails() {
    const res = await fetch(backendUrl);
    const data = await res.json();

    if(!res.ok) {
      throw new Error("Failed to fetch employees");
    }

    return data;
  }

  const {isPending, isError , data , error} = useQuery({
    queryKey : ["employee_details"],
    queryFn : fetchEmployeeDetails,
  })

  if(isPending) return <div>Loading...</div>;
  if(isError) return <div>Error: {error.message}</div>;


  return (
    <div >
      <div>
        <div>
          <h1>Employee Management System</h1>
          <EmployeeModal />
        </div>
        <EmployeeTable data={data} />
      </div>
    </div>
  )
}

export default App