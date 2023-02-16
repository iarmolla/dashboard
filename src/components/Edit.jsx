import { useState } from 'react'
import { Formik } from 'formik'
import { editUser } from "../services/users"
import { useMutation, useQueryClient } from 'react-query'
function Edit({  state, setState, userId }) {
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const queryClient = useQueryClient()
    const create = useMutation({
        mutationFn: editUser,
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries(['users'])
            }, 1000)
        },
        onError: () => {
            setErrorMessage('Unauthorized')
            setTimeout(() => {
                setErrorMessage('')
            }, 2000)
        }
    })
    return (
        <div id="popup-modal" className={`${state ? '' : 'hidden'} h-screen backdrop-brightness-50 flex flex-col justify-center items-center sm:ml-64 md:mt-0  sm:rounded-lg fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}>
            <div className="relative w-full h-full max-w-md md:h-auto">
                <div className="relative bg-white rounded-lg shadow App">
                    <button onClick={() => setState(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-500 dark:text-white">Edit user</h3>
                        <Formik
                            enableReinitialize
                            initialValues={{ name: userId?.name, lastname: userId?.lastname, salary: userId?.salary, type: userId?.type, email: userId?.email, password: userId?.password, rol : userId?.type === 0 ? 'admin' : 'user'}}
                            validate={values => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = "* Complete field *"
                                } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(values.name)) {
                                    errors.name = "* Only letters  *"
                                }
                                if (!values.lastname) {
                                    errors.lastname = "* Complete field *"
                                } else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(values.lastname)) {
                                    errors.lastname = "* Only letters  *"
                                }
                                if (!values.salary) {
                                    errors.salary = "* Complete field *"
                                } else if (!/^[0-9]+$/.test(values.salary)) {
                                    errors.salary = 'Only numbers'
                                }
                                if (!values.email) {
                                    errors.email = "* Complete field *"
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = '* Invalid format*';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { resetForm }) => {
                                if (values.rol === 'admin') {
                                    values.type = 0
                                } else if (values.rol === 'user') {
                                    values.type = 1
                                }
                                const user = {
                                    id: userId.id,
                                    name: values.name,
                                    lastname: values.lastname,
                                    salary: parseInt(values.salary),
                                    type: values.type,
                                    email: values.email.toLowerCase(),
                                    password: values.password
                                }
                                create.mutate(user)
                                resetForm()
                                setState(false)
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            }) => (
                                <form className='flex flex-col w-full px-8  rounded-lg' method='POST' onSubmit={handleSubmit}>
                                    <div className="relative flex flex-col gap-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                                        <input
                                            autoComplete='off'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            type="text" id="name" className="focus:outline-none btn-submit text-white text-sm rounded-lg block w-full p-2.5 " placeholder="John" />
                                        <div className='flex flex-col pb-2  justify-center items-star'>
                                            <label className={`text-sm font-semibold text-red-400`}>{touched.name && errors.name}</label>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col gap-2 ">
                                        <label htmlFor="lastname" className="block text-sm font-medium text-white">Lastname</label>
                                        <input
                                            autoComplete='off'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastname}
                                            type="text" id="lastname" className="focus:outline-none btn-submit text-white text-sm rounded-lg block w-full p-2.5 " placeholder="Doe" />
                                        <div className='flex flex-col pb-2  justify-center items-star'>
                                            <label className={`text-sm font-semibold text-red-400`}>{touched.lastname && errors.lastname}</label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 relative">
                                        <label htmlFor="salary" className="block  text-sm text-white font-mediumtext-white">Salary</label>
                                        <input
                                            autoComplete='off'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.salary}
                                            type="text" id="salary" className="focus:outline-none btn-submit text-white text-sm rounded-lg block w-full p-2.5" placeholder="Salary" />
                                        <div className='flex flex-col pb-2  justify-center items-star'>
                                            <label className={`text-sm font-semibold text-red-400`}>{touched.salary && errors.salary}</label>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col gap-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                                        <input
                                            autoComplete='off'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            type="email" id="email" className="btn-submit focus:outline-none text-white text-sm rounded-lg block w-full p-2.5 " placeholder="name@gmail.com" />
                                        <div className='flex flex-col pb-2 justify-center items-star'>
                                            <label className={`text-sm font-semibold text-red-400`}>{touched.email && errors.email}</label>
                                        </div>
                                    </div>
                                    <label htmlFor="rol" className="block mb-2 text-sm font-medium text-white pt-3">Select an option</label>
                                    <select name="rol" onChange={handleChange} onBlur={handleBlur} value={values.rol} id="rol" className="mb-4 border btn-submit  text-white text-sm rounded-lg  block w-full p-2.5">
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    <div className={`flex flex-col pt-6 ${touched.password && errors.password ? 'pt-0' : ''}`}>
                                        <button type="submit" className="text-white btn-submit focus:outline-none font-medium rounded-lg text-sm  px-5 py-2.5 text-center">Save</button>
                                    </div>

                                    <div className="flex flex-col justify-center items-start pt-2 text-red-400">
                                        <span>{errorMessage}</span>
                                    </div>
                                    <div className="flex flex-col justify-center items-start pt-2 text-green-400">
                                        <span>{message}</span>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit