import { Formik } from 'formik'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { registerUser } from "../services/users"

function Register() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const create = useMutation({
        mutationFn: registerUser,
        onSuccess: (response) => {
            const { token } = response.data
            localStorage.setItem('token', token)
            if (token) {
                setMessage('Successfull')
                setTimeout(() => {
                    navigate('/login')
                }, 1500);
            } else {
                setMessage('Email already exists')
            }
        }
    })
    return (
        <div className='h-screen flex flex-col justify-center'>
            <div>
                <Formik
                    initialValues={{ name: '', lastname: '', salary: '', type: '', email: '', password: '', confirmPassword: '' }}
                    validate={values => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        const user = {
                            name: values.name,
                            lastname: values.lastname,
                            salary: values.salary,
                            type: values.type,
                            email: values.email,
                            password: values.password
                        }
                        console.log(values)
                        create.mutate(user)
                        resetForm()
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
                        <form className='p-11 mx-5  rounded-lg border border-gray-400' method='POST' onSubmit={handleSubmit}>
                            <h1 className='dark:text-gray-400 text-2xl mb-5'>Register</h1>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="name" id="name"
                                    autoComplete='off'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name} className="dark:text-white block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete='off'
                                    value={values.lastname}
                                    type="text" name="lastname" id="lastname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lastname</label>
                            </div>
                            <div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text"
                                        autoComplete='off'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.salary}
                                        name="salary"
                                        id="salary"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 dark:text-white border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        min={0}
                                        step={'0.01'}
                                        required />
                                    <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Salary</label>
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete='off'
                                        value={values.type}
                                        name="type" id="type" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input
                                        autoComplete='off'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        required />
                                    <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input
                                        autoComplete='off'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                        required />
                                    <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                </div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input
                                        autoComplete='off'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                        type="password" name="confirmPassword" id="confirmPassword" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                                </div>
                            </div>
                            <button type="submit" className="text-white bg-indigo-400 hover:bg-indigo-500 transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:bg-gray-900">Send</button>
                            {
                                message ? <div className='mt-5 text-green-700'>
                                    <span>{message}</span>
                                </div> : <></>
                            }
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Register