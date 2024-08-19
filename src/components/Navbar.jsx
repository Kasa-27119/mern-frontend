import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const getEmailCharsBeforeAtSymbol = (email) => {
    const delimiter = '@'
    const parts = email.split(delimiter)
    return parts.length > 1 ? parts[0] : ''
  }

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <div className='container'>
            <Link to='/'>
                <h1>Workout App</h1>
            </Link>
            <nav>
              {/* if theres  a user */}
              {user && <div>
                <span>{getEmailCharsBeforeAtSymbol(user.email)}</span>
                <button onClick={handleClick} id='logoutBtn'>Logout</button>
              </div>}

              {/* if theres no user */}
              {!user && <div>
                <Link to='./login'>Log In</Link>
                <Link to='./signup'>Sign Up</Link>
              </div>}
            </nav>
        </div>
    </header>
  )
}

export default Navbar
