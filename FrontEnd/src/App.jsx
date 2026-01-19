/**
 * APP.JSX - MAIN APPLICATION FILE
 * ================================
 * 
 * PURPOSE:
 * This is the main entry point of our React application.
 * It sets up routing using React Router so users can navigate between different pages.
 * 
 * ROUTING STRUCTURE:
 * 1. /login → Shows Login page (Sign In)
 * 2. /signup → Shows Signup page (Create Account)
 * 3. / (root) → Automatically redirects to /login
 * 
 * HOW ROUTING WORKS:
 * - <Router> wraps the entire app to enable navigation
 * - <Routes> defines all available routes
 * - <Route> sets path and which component to show
 * - <Navigate> redirects from one path to another
 * 
 * FLOW:
 * User visits app → Root path "/" → Gets redirected to "/login" → Login page shows
 * OR
 * User clicks "Sign Up" link → Goes to "/signup" → Signup page shows
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { BabyProvider } from './context/BabyContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Nutrition from './pages/Nutrition'
import Vaccines from './pages/Vaccines'
import Feeding from './pages/Feeding'
import Growth from './pages/Growth'
import Profile from './pages/Profile'
import StageSelect from './pages/StageSelect'
import PregnantHome from './pages/PregnantHome'
import PregnantNutrition from './pages/PregnantNutrition'
import PregnantVaccines from './pages/PregnantVaccines'
import './App.css'

/**
 * APP COMPONENT
 * =============
 * Main component that sets up routing for the entire application
 */
function App() {
  return (
    <BabyProvider>
      {/* Router: Enables all React Router functionality */}
      <Router>
        {/* Routes: Container for all route definitions */}
        <Routes>
          {/* Route 0: Welcome / Stage selection */}
          <Route path="/welcome" element={<StageSelect />} />

          {/* Route 1: Home Page (Dashboard) - New Parent */}
          {/* Path: /home → Shows <Home /> component */}
          <Route path="/home" element={<Home />} />

          {/* Route 1b: Pregnant Home Page (Dashboard) - Pregnant Users */}
          {/* Path: /pregnant/home → Shows <PregnantHome /> component */}
          <Route path="/pregnant/home" element={<PregnantHome />} />
          
          {/* Route 2: Login Page */}
          {/* Path: /login → Shows <Login /> component */}
          <Route path="/login" element={<Login />} />
          
          {/* Route 3: Signup Page */}
          {/* Path: /signup → Shows <Signup /> component */}
          <Route path="/signup" element={<Signup />} />

          {/* Route 4: Nutrition Page - New Parent */}
          {/* Path: /nutrition → Shows <Nutrition /> component */}
          <Route path="/nutrition" element={<Nutrition />} />

          {/* Route 4b: Pregnant Nutrition Page */}
          {/* Path: /pregnant/nutrition → Shows <PregnantNutrition /> component */}
          <Route path="/pregnant/nutrition" element={<PregnantNutrition />} />

          {/* Route 5: Vaccines Page - New Parent */}
          {/* Path: /vaccines → Shows <Vaccines /> component */}
          <Route path="/vaccines" element={<Vaccines />} />

          {/* Route 5b: Pregnant Vaccines/Health Page */}
          {/* Path: /pregnant/vaccines → Shows <PregnantVaccines /> component */}
          <Route path="/pregnant/vaccines" element={<PregnantVaccines />} />

          {/* Route 6: Feeding Page */}
          {/* Path: /feeding → Shows <Feeding /> component */}
          <Route path="/feeding" element={<Feeding />} />

          {/* Route 7: Growth Page */}
          {/* Path: /growth → Shows <Growth /> component */}
          <Route path="/growth" element={<Growth />} />

          {/* Route 8: Profile Page */}
          {/* Path: /profile → Shows <Profile /> component */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Route 9: Root Path Redirect */}
          {/* Path: / (any other path) → Redirect to /login */}
          {/* replace: replaces history entry so user can't go back to "/" */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </Router>
    </BabyProvider>
  )
}

export default App
