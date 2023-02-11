import { Formik } from 'formik'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Navigate, useNavigate, Link } from 'react-router-dom'
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
        <div className='h-full flex flex-col justify-center items-center'>
            <Formik
                initialValues={{ name: '', lastname: '', salary: '', type: '', email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = "* Complete field *"
                    }
                    if (!values.lastname) {
                        errors.lastname = "* Complete field *"
                    }
                    if (!values.salary) {
                        errors.salary = "* Complete field *"
                    }
                    if (!values.type) {
                        errors.type = "* Complete field *"
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
                    console.log(errors)

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
                    <form className='flex flex-col w-full px-8  rounded-lg sm:w-1/2' method='POST' onSubmit={handleSubmit}>
                        <h1 className='text-white text-2xl pb-3'>Register</h1>
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
                        <div className={`flex flex-col pt-8 ${touched.password && errors.password ? 'pt-0' : ''}`}>
                            <button type="submit" className="text-white btn-submit focus:outline-none font-medium rounded-lg text-sm  px-5 py-2.5 text-center">Register</button>
                        </div>
                        <div className='pt-3'>
                            <span className=' text-white'>Dont have an account yet? <Link to="/login" className='text-blue-400 hover:border-b hover:border-blue-600'>Login</Link></span>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Register