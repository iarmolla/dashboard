import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUserAlt, FaMoon } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { signOut } from '../helpers/signout'

function Sidebar() {
    const [user, setUser] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const navigate = useNavigate('')
    return (
        <div>
            <button onClick={() => setSidebar(!sidebar)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside className={`${sidebar ? 'App' : '-translate-x-full'}  fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 border-r-2 border-r-gray-700`} aria-label="Sidebar">
                <button onClick={() => setSidebar(!sidebar)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2 ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                <div className="h-full px-3 py-4 ">
                    <ul className="space-y-2 text-white">
                        <li>
                            <Link to="/data" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg link">
                                <svg aria-hidden="true" className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                <span className="ml-3 text-white">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => setUser(!user)} type="button" className="flex items-center w-full p-2 text-base font-normal text-white link transition duration-75 rounded-lg group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <span className='text-gray-400'><FaUserAlt></FaUserAlt></span>
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">Users</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <ul id="dropdown-example" className={`${!user ? 'hidden' : ''} py-2 space-y-2`}>
                                <li>
                                    <span className="flex link items-center w-full p-2 link text-base font-normal  transition duration-75 rounded-lg pl-11 group " onClick={() => navigate('/create')}>Create user</span>
                                </li>
                                <li>
                                    <span className="flex items-center w-full link p-2 text-base font-normal  transition duration-75 rounded-lg pl-11 group " onClick={() => navigate('/')}>List users</span>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/settings" className="flex items-center p-2 text-base font-normal text-gray-400 rounded-lg link">
                                <IoMdSettings />
                                <span className="ml-3 text-white">Settings</span>
                            </Link>
                        </li>
                        <li>
                            <span className="flex items-center p-2 link rounded-lg text-base font-normal">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75  group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                                <span onClick={() => signOut(navigate)} className="flex-1 ml-3 whitespace-nowrap">Sign out</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar