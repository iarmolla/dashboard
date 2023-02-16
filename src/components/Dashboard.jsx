import { useQuery } from 'react-query'
import { getUsers } from '../services/users'
import Sidebar from './Sidebar'
import { useState } from 'react';
import { signOut } from '../helpers/signout'
import { Link, useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png'
function Dashboard() {
  const navigate = useNavigate('')
  const [user, setUser] = useState(false)
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
  return (
    <>
      <Sidebar></Sidebar>
      <nav className="px-2 right-0 top-2 absolute sm:px-4 py-2.5">
        <div className="relative container flex flex-wrap items-center justify-between mx-auto">
          <div></div>
          <div className="flex md:mt-3 flex-col items-center md:order-2">
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" onClick={() => { setUser(!user) }} >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={profile} alt="user photo" />
            </button>
            <div className={`z-50 ${user ? 'absolute' : 'hidden'} top-24 right-10  md:top-11 md:right-0 md:mr-1 my-4 text-base list-none btn-submit rounded-lg shadow `} >
              <div className="px-4 py-3">
                <span className="block text-sm font-medium truncate text-gray-400">{localStorage.getItem('email') || 'email'}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                  <Link to='/settings' className="link block px-4 py-2 text-sm text-gray-400">Settings</Link>
                </li>
                <li>
                  <span onClick={() => signOut(navigate)} className="link block px-4 py-2 text-sm text-gray-400">Sign out</span>
                </li>
              </ul>
            </div>

          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">

          </div>
        </div>
      </nav>
    </>
  )
}

export default Dashboard