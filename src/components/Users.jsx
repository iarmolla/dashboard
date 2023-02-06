import { Formik } from 'formik'
import { useMutation } from 'react-query'
import { createUser } from "../services/users"

function Users() {
    const create = useMutation({
        mutationFn: createUser
    })    
    return (
        <div class="p-4 sm:ml-64 md:mt-14">
            <h1 className='block py-2.5 text-2xl px-0 w-full  text-gray-900  dark:text-gray-400  appearance-none pl-4 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>Create user</h1>
            <div class="p-4 rounded-lg">
                <Formik
                    initialValues={{ name: '', salary: '' }}
                    validate={values => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values) => {
                        console.log(values)
                        create.mutate(values)
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
                        <form method='POST' onSubmit={handleSubmit}>
                            <div class="relative z-0 w-full mb-6 group">
                                <input type="text" name="name" id="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name} class="dark:text-white block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div class="">
                                <div class="relative z-0 w-full mb-6 group">
                                    <input type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.salary}
                                        name="salary" id="salary" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 dark:text-white border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Salary</label>
                                </div>
                            </div>
                            <button type="submit" class="text-white bg-indigo-400 hover:bg-indigo-500 transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:bg-gray-900">Send</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Users