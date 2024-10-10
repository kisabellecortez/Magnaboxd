import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './context/AuthContext.js'
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import Explore from './pages/Explore'
import TBP from './pages/TBP'
import Settings from './pages/Settings.js'
import MyGames from './pages/MyGames'

/* added _redirects under build to go to different pages */

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>  
            <Route index element={<SignIn/>}/>
            <Route
              path='/explore'
              element={
                  <Explore />
              }
            />

            <Route
                path='/mygames'
                element={
                    <MyGames />
                }
            />

            <Route
                path='/tobeplayed'
                element={
                    <TBP />
                }
            />

            <Route
                path='/settings'
                element={
                    <Settings />
                }
            />

            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
