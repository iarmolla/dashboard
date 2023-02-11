import { useState } from 'react'
import { Formik } from 'formik'
import { useMutation } from 'react-query'
import { loginUser } from "../services/users"
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const [message, setMessage] = useState('')
    const navigate = useNavigate('')
    const create = useMutation({
        mutationFn: loginUser,
        onSuccess: (response, data) => {
            const { token } = response.data
            localStorage.setItem('email', data.email)
            localStorage.setItem('token', token)
            if (token) {
                navigate('/')
            }
        },
        onError: (error) => {
            const { message } = error.response.data
            setMessage(message)
        }
    })
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = '* Complete field *';
                    }
                    if (!values.password) {
                        errors.password = '* Complete field *'
                    }
                    return errors
                }}
                onSubmit={(values) => {
                    const user = {
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
                    <form className='flex flex-col p-5  sm:p-10 rounded-md border border-slate-500' onSubmit={handleSubmit}>
                        <h1 className='text-white font-semibold text-2xl mb-5'>Login to dashboard</h1>
                        <div className=" sm:w-80">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                autoComplete='off'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                type="email" id="email" className="focus:outline-none btn-submit text-white text-sm rounded-lg block w-full p-2.5 " placeholder="name@gmail.com" />
                            <div className='flex flex-col justify-center items-start py-2'>
                                <label className={`text-sm font-semibold text-red-400`}>{touched.email && errors.email}</label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input
                                placeholder='password'
                                autoComplete='off'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                type="password" id="password" className="focus:outline-none  btn-submit text-white text-sm rounded-lg block w-full p-2.5 " />
                            <div className='flex flex-col justify-center items-start py-2'>
                                <label className={`text-sm font-semibold text-red-400`}>{touched.password && errors.password}</label>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <button type="submit" className="text-white btn-submit focus:outline-none font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">Send</button>
                            <span className=' text-white'>Dont have an account yet? <Link to="/register" className='text-blue-400 hover:border-b hover:border-blue-600'>Sign up</Link></span>
                        </div>
                        <div className="flex flex-col justify-center items-center text-red-400">
                            <span>{message}</span>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Login