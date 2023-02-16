import { getUsers } from "../services/users"
import { useQuery } from 'react-query'
import Modal from "./Modal"
import Edit from "./Edit"

import { useState } from "react"

function Table() {
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })
   
    const [userId, setUserId] = useState()
    if (isLoading) {
        return (
            <div className="sm:ml-64 md:mt-14 sm:rounded-lg overflow-x-scroll scrollbar-hide">
                <table className="text-sm text-left text-gray-500 w-full sm:rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Salary
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit/Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div>
            <div className="sm:ml-64 md:mt-0 sm:rounded-lg overflow-x-scroll scrollbar-hide">
                <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
                    <thead className="text-xs  text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Salary
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit/Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            data.map((user, index) => {
                                return (
                                    <tr key={index} className="border-b dark:border-gray-700 tr-user">
                                        <td className="px-6 py-4">{user.id}</td>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4">${user.salary}</td>
                                        <td className="flex items-center px-6 py-4 space-x-3">
                                            <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                                                setUserId(user);
                                                setEdit(!edit)
                                            }}>Edit</span>
                                            <span className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => {
                                                setModal(!modal);
                                                setUserId(user.id);
                                            }}>Remove</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="text-red-400 pl-5 pt-5">
                    {errorMessage}
                </div>
                <Modal setErrorMessage={setErrorMessage} state={modal} setState={setModal} id={userId} />
                <Edit state={edit} setState={setEdit}  userId={userId} />
            </div>
        </div>
    )
}

export default Table