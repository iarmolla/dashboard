import error from '../assets/400.svg'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div className='h-screen w-screen flex flex-col items-center justify-center'>
            <img src={error} className="md:w-2/4" alt="400" />
            <Link to="/login" className='btn-submit p-3 rounded-md text-white font-bold text-2xl'>Login</Link>
        </div>
    )
}

export default Error