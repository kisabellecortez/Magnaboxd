import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './context/AuthContext.js'
import SignIn from './pages/SignIn.js'
import SignUp from './pages/SignUp.js'
import Explore from './pages/Explore'
import TBP from './pages/TBP'
import MyGames from './pages/MyGames'

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
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />

            <Route
                path='/mygames'
                element={
                  <ProtectedRoute>
                    <MyGames />
                  </ProtectedRoute>
                }
            />

            <Route
                path='/tobeplayed'
                element={
                  <ProtectedRoute>
                    <TBP />
                  </ProtectedRoute>
                }
            />

            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
