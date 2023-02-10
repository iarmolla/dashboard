import React from 'react'
import { Formik } from 'formik'
import { useMutation } from 'react-query'
import { loginUser } from "../services/users"
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate('')
    const create = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {         
            const { token } = response.data
            localStorage.setItem('token', token)
            if (token) {              
                navigate('/')              
            }      
        }
    })
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    const user = {                        
                        email: values.email,
                        password: values.password
                    }
                    create.mutate(user)          
                    // resetForm()
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
                    <form className='flex flex-col gap-3 p-10 rounded-md border border-slate-500' onSubmit={handleSubmit}>
                        <h1 className='text-white font-semibold text-2xl mb-5'>Login to dashboard</h1>
                        <div class="mb-6 w-80">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input 
                            autoComplete='off'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input 
                            autoComplete='off'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Login