
export const signOut = (navigate) => {
    localStorage.removeItem('email')
    navigate('/login')
}

