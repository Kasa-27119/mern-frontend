import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

// import pages/components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import SingleWorkout from './pages/SingleWorkout'

const App = () => {
  const {user} = useAuthContext()

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar></Navbar>
        <div className='pages'>
          <Routes>
            {/* if we have a user, show home, else go to login: */}
            <Route path='/' element={user ? <Home/> : <Navigate to='/login'/>}></Route>

            {/* if we don't have a user, show login, if we do, go to home */}
            <Route path='/login' element={!user ? <LogIn/> : <Navigate to='/'/>}></Route>

            {/* if we don't have a user, go to sign up, but if we do, navigate to home */}
            <Route path='/signup' element={!user ? <SignUp/> : <Navigate to='/'/>}></Route>

            {/* if we have a user, go to single, else go to login */}
            <Route path='/:id' element={user ? <SingleWorkout/> : <Navigate to='/login'/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
