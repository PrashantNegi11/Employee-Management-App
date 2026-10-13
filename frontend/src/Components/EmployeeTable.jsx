import React from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EmployeeModal from './EmployeeModal';
import { useMutation } from '@tanstack/react-query';
import { backendUrl } from '../App';
import { queryClient } from '../utils/queryClients';
import toast from 'react-hot-toast';



function EmployeeTable({data}) {
    if(!data?.length){
        return (
            <div>
                No Employee Data Available!!
            </div>
        )
    }

    const mutation = useMutation({
        mutationFn : async (id) => {
            const response = await fetch(`${backendUrl}/${id}`,{
                method : "delete",
                header : {"Content-Type": "application/json"}
            });

            const result = await response.json();

            if(!response.ok){
                throw new Error(result.error);
            }
            return result;
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: ()=>{
            toast.success("Employee Details Deleted Successfully");

            queryClient.invalidateQueries({
                queryKey: ["employee_details"]
            });

        }
        

    })
    return (
        <div className='w-full iverflow-x-auto '>
            <div className='m-2 min-w-225 border-border  overflow-hidden rounded-lg border'>
                <table className='w-full '>
                    <thead className="border-border bg-muted border-b text-sm font-medium">
                        <tr className='text-left test-sm text-gray-600'>
                            <th className='px-2.5 py-2 text-start font-medium '>ID</th>
                            <th className='px-2.5 py-2 text-start font-medium '>Name</th>
                            <th className='px-2.5 py-2 text-start font-medium '>Email</th>
                            <th className='px-2.5 py-2 text-start font-medium '>Age</th>
                            <th className='px-2.5 py-2 text-start font-medium '>Role</th>
                            <th className='px-2.5 py-2 text-start font-medium '>Salary</th>
                            <th className='px-2.5 py-2 text-start font-medium '>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.map( (item) => (
                            <tr key={item.id} className='even:bg-muted text-sm text-gray-700 rounded-2xl transition hover:bg-gray-200/60 shadow-[inset_1px_1px_2px_#e5e5e5'>
                                <td className='py-4  px-4 '>{item.id} </td>
                                <td className='py-4  px-4'>{item.name}</td>
                                <td className='py-4  px-4'>{item.email}</td>
                                <td className='py-4  px-4'>{item.age}</td>
                                <td className='py-4  px-4'>{item.role}</td>
                                <td className='py-4  px-4'>{item.salary}</td>
                                <td className='py-4  px-4'>
                                    <div className='flex item-center gap-4'>
                                        <button onClick={ ()=>{ mutation.mutate(item.id)}} className='p-2 rounded-lg bg-grat-100 shadow-[3px_3px_6px_#c5c5c5, -3px_-3px_6px_#fff] hover:shadow-inner text-red-600 transition'> 
                                            <MdDeleteForever />
                                        </button>
                                        <EmployeeModal data={item} type="update">
                                            <button className='p-2 rounded-lg bg-grat-100 shadow-[3px_3px_6px_#c5c5c5, -3px_-3px_6px_#fff] hover:shadow-inner text-green-600 transition'>
                                                <FaEdit />
                                            </button>
                                        </EmployeeModal>
                                        
                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeTable