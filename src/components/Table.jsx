import { getUsers } from "../services/users"
import { useQuery } from 'react-query'
import Modal from "./Modal"
import { useState } from "react"

function Table() {
    const [modal,setModal] = useState(false)
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })   
    const [userId, setUserId] = useState()
    if(isLoading) {
        return (
            <div class="p-4 sm:ml-64 md:mt-14 sm:rounded-lg">
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <div>
            <div class="p-4 sm:ml-64 md:mt-14 sm:rounded-lg">            
                <table class="text-sm text-left text-gray-500 dark:text-gray-400 w-full sm:rounded-lg">
                    <thead class="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 th-id">
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Salary
                            </th>
                            <th scope="col" class="px-6 py-3 th-edit">
                                Edit/Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {

                            data.map((user) => {
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-200/50 dark:hover:bg-gray-600">
                                        <td class="px-6 py-4">{user.id}</td>
                                        <td class="px-6 py-4">
                                            {user.name}
                                        </td>
                                        <td class="px-6 py-4">{user.salary}</td>
                                        <td class="flex items-center px-6 py-4 space-x-3">
                                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" >Edit</a>
                                            <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=> {
                                                setModal(!modal);
                                                setUserId(user.id);
                                            }}>Remove</a>
                                        </td>
                                    </tr>
                                    
                                )
                            })
                        }
                    </tbody>
                </table>
                <Modal state={modal} setState={setModal} id={userId}/>
            </div>

        </div>
    )
}

export default Table