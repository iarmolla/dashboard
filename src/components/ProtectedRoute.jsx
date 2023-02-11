import { getUser } from '../helpers/getUser'
import unauthorized from '../assets/403.svg'
import { Link } from 'react-router-dom'

function ProtectedRoute({ children }) {

    if (!getUser()) {
        return <div className='h-screen w-screen flex flex-col items-center justify-center'>
            <img src={unauthorized} className="md:w-2/4" alt="403" />
            <h1 className='text-white font-bold text-2xl'>No authorized</h1>
            <Link to="/login" className='btn-submit p-3 rounded-md text-white font-bold mt-3 text-2xl'>Login</Link>
        </div>
    }
    return (
        children
    )
}

export default ProtectedRoute