import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { getUser, settings } from "../services/users"
import { useMutation } from 'react-query'
import { getUser as getEmail } from '../helpers/getUser'
function Settings() {
    const [file, setFile] = useState('')
    const [image, setImage] = useState('')
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const create = useMutation({
        mutationFn: getUser,
        onSuccess: (values) => {
            setUser(values.data[0])
        }
    })
    const edit = useMutation({
        mutationFn: settings,
        onSuccess: (values, variables) => {
            localStorage.setItem('email', variables.email)
            setMessage('Successfull')
            setTimeout(() => {
                setMessage('')
            }, 2000)
        },
        onError: () => {
            setMessage('Error')
            setTimeout(() => {
                setMessage('')
            }, 2000)
        }
    })
    useEffect(() => {
        const email = getEmail()
        create.mutate(email)
    }, [])
    return (
        <div className='sm:ml-72 ml-5 mr-5 mt-10 md:mt-14 flex flex-col  gap-3'>
            <article>
                <section className='flex flex-col '>
                    <h1 className='text-white text-2xl '>Profile</h1>
                    <p className='text-gray-400'>This is information private</p>
                </section>
            </article>
            <Formik
                enableReinitialize
                initialValues={{ name: user.name, lastname: user.lastname, salary: user.salary, email: user.email, }}
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
                    values.salary = parseInt(values.salary)
                    values.id = user.id
                    edit.mutate(values)
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

                        <div className={`flex flex-col pb-2  justify-center items-start ${touched.password && errors.password ? '' : 'hidden'}`}>
                            <label className={`pt-3 text-sm font-semibold text-red-400`}>{touched.password && errors.password}</label>
                        </div>
                        <label for="type" className="block mb-2 text-sm font-medium text-white pt-3">Select an option</label>
                        <select disabled name="type" onChange={handleChange} onBlur={handleBlur} value={values.type} id="type" className="mb-4 border btn-submit  text-white text-sm rounded-lg  block w-full p-2.5">
                            <option selected={user.type}>
                                {
                                    user.type === 1 ? 'User' : 'Admin'
                                }
                            </option>
                        </select>
                        <div className={`flex flex-col mb-5 pt-6 ${touched.password && errors.password ? 'pt-0' : ''}`}>
                            <button type="submit" className="text-white btn-submit focus:outline-none font-medium rounded-lg text-sm  px-5 py-2.5 text-center">Save</button>
                        </div>
                        <div className={`${!message ? 'hidden' : 'block'}`}>
                            <span className='text-green-400'>{message}</span>
                        </div>
                    </form>
                )}
            </Formik>

        </div>
    )
}

export default Settings