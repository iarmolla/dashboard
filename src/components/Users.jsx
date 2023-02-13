import { Formik } from 'formik'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { createUser } from "../services/users"

function Users() {
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const create = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            setMessage('Account Created successfully')
            setTimeout(() => {
                setMessage('')
            }, 2000)
        },
        onError: () => {
            setErrorMessage('Unauthorized')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    })
    return (
        <div className="p-4 flex flex-col items-center sm:ml-64 md:mt-0">
            <h1 className='block py-2.5 text-2xl px-0 w-full  text-white  appearance-none pl-4 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>Create user</h1>
            <div className="p-4 w-full rounded-lg">
                <Formik
                    initialValues={{ name: '', lastname: '', salary: '', type: 'admin', email: '', password: '', rols: 'admin' }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "* Complete field *"
                        } else if(!/^[A-Z]\w{3,12}$/.test(values.name)) {
                            errors.name = "* Must be letters and at least 4 characters *"
                        }
                        if (!values.rols) {
                            errors.rols = '*Complete field*'
                        }
                        if (!values.lastname) {
                            errors.lastname = "* Complete field *"
                        } else if(!/^[A-Z]\w{3,12}$/.test(values.lastname)) {
                            errors.lastname = "* Must be letters and at least 4 characters *"
                        }
                        if (!values.salary) {
                            errors.salary = "* Complete field *"
                        } else if(!/^[0-9]+$/.test(values.salary)) {
                            errors.salary = 'Only numbers'
                        }
                        if (!values.email) {
                            errors.email = "* Complete field *"
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = '* Invalid format*';
                        }
                        if (!values.password) {
                            errors.password = "* Complete field *"
                        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
                            errors.password = '* Minimum eight characters, at least one letter and one number *'
                        }
                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        let rol
                        if (values.rols === 'admin') {
                            rol = 0
                        } else if (values.rols === 'user') {
                            rol = 1
                        }
                        const user = {
                            name: values.name,
                            lastname: values.lastname,
                            salary: values.salary,
                            type: rol,
                            email: values.email,
                            password: values.password
                        }
                        create.mutate(user)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
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
                            <div className="relative flex flex-col gap-2">
                                <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                                <input
                                    autoComplete='off'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Your password"
                                    value={values.password}
                                    type="password" id="password" className="btn-submit focus:outline-none text-white text-sm rounded-lg block w-full p-2.5 " />
                            </div>
                            <div className={`flex flex-col pb-2  justify-center items-start ${touched.password && errors.password ? '' : 'hidden'}`}>
                                <label className={`pt-3 text-sm font-semibold text-red-400`}>{touched.password && errors.password}</label>
                            </div>
                            <label for="rols" className="block mb-2 text-sm font-medium text-white pt-3">Select an option</label>
                            <select name="rols" onChange={handleChange} onBlur={handleBlur} value={values.rols} id="rols" className="mb-4 border btn-submit  text-white text-sm rounded-lg  block w-full p-2.5">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <div className={`flex flex-col pt-6 ${touched.password && errors.password ? 'pt-0' : ''}`}>
                                <button type="submit" className="text-white btn-submit focus:outline-none font-medium rounded-lg text-sm  px-5 py-2.5 text-center">Register</button>
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
    )
}

export default Users