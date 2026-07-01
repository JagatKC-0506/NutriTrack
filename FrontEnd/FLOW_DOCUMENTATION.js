/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NUTRITRACK MOBILE APP - FRONTEND FLOW DOCUMENTATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * PROJECT: Maternity & Newborn Baby Health Tracking App
 * STATUS: Frontend only (Backend coming later)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * CURRENT IMPLEMENTED PAGES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. LOGIN PAGE (/login)
 * 2. SIGNUP PAGE (/signup)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * APPLICATION FLOW
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * START
 *   ↓
 * [App.jsx] - Sets up routing
 *   ↓
 * User visits app at localhost:5173
 *   ↓
 * Gets redirected to /login route
 *   ↓
 * [Login Page] Shows:
 *   - Email field
 *   - Password field
 *   - "Sign In" button
 *   - "Forgot password?" link
 *   - "Don't have an account? Sign Up" link
 *   ↓
 * User has two options:
 *   
 *   OPTION 1: User has existing account
 *   └─→ Enters email & password
 *       ↓
 *       Form validates inputs
 *       ↓
 *       If valid → Shows "Signing in..." loading state
 *                → Saves user to localStorage
 *                → Redirects to /dashboard (future page)
 *       
 *       If invalid → Shows error message
 *   
 *   OPTION 2: User clicks "Sign Up" link
 *   └─→ Navigates to /signup route
 *       ↓
 *   [Signup Page] Shows:
 *       - Full Name field
 *       - Email field
 *       - User Type selector (Pregnant Mom / New Parent)
 *       - Due Date / Baby's Date of Birth field
 *       - "Continue" button
 *       - "Already have an account? Sign In" link
 *       ↓
 *       User enters information and selects user type:
 *       - "Pregnant Mom" = Expecting mother
 *       - "New Parent" = Already has baby born
 *       ↓
 *       Form validates inputs
 *       ↓
 *       If valid → Shows "Creating Account..." loading state
 *                → Saves user to localStorage with ID
 *                → Redirects to /login with success message
 *       
 *       If invalid → Shows error message (examples):
 *                   - Please fill in all fields
 *                   - Please enter a valid email
 *                   - Full name must be at least 2 characters
 *       ↓
 *       User is back on Login page
 *       └─→ Can now sign in with their new account
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * FILE STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * FrontEnd/
 * ├── src/
 * │   ├── App.jsx ..................... Main app component with routing setup
 * │   ├── App.css ..................... Main app styles
 * │   ├── main.jsx .................... Entry point (don't modify)
 * │   ├── index.css ................... Global styles
 * │   │
 * │   ├── pages/
 * │   │   ├── Login.jsx ............... Login/Sign In page component
 * │   │   └── Signup.jsx .............. Sign Up/Create Account page component
 * │   │
 * │   └── styles/
 * │       └── Auth.css ............... Styling for login and signup pages
 * │
 * ├── package.json ................... Project dependencies
 * ├── vite.config.js ................. Vite configuration
 * └── index.html ..................... Main HTML file
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * COMPONENT BREAKDOWN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * APP.JSX
 * --------
 * Purpose: Main router setup
 * Key Code:
 *   - Imports React Router components
 *   - Defines all routes (paths and pages)
 *   - Wraps everything in <Router> to enable navigation
 * 
 * Routes:
 *   /login → <Login /> component
 *   /signup → <Signup /> component
 *   / → Redirects to /login
 * 
 * 
 * LOGIN.JSX
 * ----------
 * Purpose: Sign In existing users
 * State Variables:
 *   - email: User's email input
 *   - password: User's password input
 *   - error: Error messages to display
 *   - isLoading: Shows loading state during submission
 * 
 * Key Functions:
 *   - handleSubmit(): Runs when user clicks "Sign In"
 *     1. Validate email and password
 *     2. Simulate API call to backend
 *     3. Save user to localStorage
 *     4. Redirect to dashboard
 * 
 * Form Validation Rules:
 *   ✓ Email field must not be empty
 *   ✓ Password field must not be empty
 *   ✓ Email must contain "@" symbol
 * 
 * 
 * SIGNUP.JSX
 * -----------
 * Purpose: Create new user accounts
 * State Variables:
 *   - formData: Object containing fullName, email, userType, dueDate
 *   - error: Error messages to display
 *   - isLoading: Shows loading state during submission
 * 
 * Key Functions:
 *   - handleInputChange(): Runs when user types in text fields
 *     Updates formData with new values
 *   
 *   - handleUserTypeChange(): Runs when user clicks Pregnant Mom/New Parent
 *     Updates userType in formData ('pregnant' or 'newParent')
 *   
 *   - handleSubmit(): Runs when user clicks "Continue"
 *     1. Validate all fields
 *     2. Simulate API call to backend
 *     3. Save user to localStorage
 *     4. Redirect to login page
 * 
 * Form Validation Rules:
 *   ✓ Full Name must not be empty
 *   ✓ Email must not be empty
 *   ✓ User Type must be selected
 *   ✓ Due Date/Baby Date must not be empty
 *   ✓ Email must contain "@" symbol
 *   ✓ Full Name must be at least 2 characters
 * 
 * User Types:
 *   - "pregnant" = Pregnant Mother (due date expected)
 *   - "newParent" = New Parent (baby already born)
 * 
 * 
 * AUTH.CSS
 * ---------
 * Purpose: Styling for all authentication pages
 * Color Theme:
 *   - Primary Pink: #ff1493
 *   - Primary Purple: #8b3a8b
 *   - Light Purple: #f0e6f0
 *   - Dark Blue (text): #1a3a52
 * 
 * Key Classes:
 *   - .auth-container: Full screen wrapper
 *   - .auth-card: White card containing form
 *   - .heart-icon: Decorative heart at top
 *   - .form-input: Text input fields
 *   - .auth-button: Pink gradient submit button
 *   - .error-message: Red error text display
 * 
 * Responsive Design:
 *   - Desktop: Max 450px width
 *   - Tablet: Full width with padding
 *   - Mobile: Adjusted sizing for small screens
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * FEATURES EXPLAINED
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. FORM VALIDATION
 *    - Checks if fields are empty before submission
 *    - Validates email format (must contain @)
 *    - Shows specific error messages for each validation failure
 *    - Prevents form submission if validation fails
 * 
 * 2. LOADING STATE
 *    - Button changes text to "Signing in..." or "Creating Account..."
 *    - Button is disabled (cannot click again) during submission
 *    - Shows user something is happening
 * 
 * 3. ERROR HANDLING
 *    - Displays error messages in red box
 *    - Error clears when user tries again
 *    - Different error messages for different failures
 * 
 * 4. LOCAL STORAGE
 *    - Saves user info to browser's localStorage
 *    - Allows remembering user is logged in
 *    - (Real app would use secure authentication)
 * 
 * 5. NAVIGATION/ROUTING
 *    - <Link> components for navigation without page reload
 *    - useNavigate hook to redirect after actions
 *    - React Router handles page transitions
 * 
 * 6. CONDITIONAL RENDERING
 *    - Shows error only if error state has value
 *    - Changes button text based on loading state
 *    - Changes label based on user type in signup
 *    - Highlights active user type button
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * HOW TO RUN THE APP
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. Open terminal in FrontEnd folder
 * 2. Run: npm install (if dependencies not installed)
 * 3. Run: npm run dev
 * 4. Open browser to: http://localhost:5173
 * 5. You should see the Login page
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * NEXT STEPS FOR DEVELOPMENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. Create Dashboard page (after successful login)
 * 2. Create Forgot Password page
 * 3. Add more pages for:
 *    - Pregnancy tracking
 *    - Baby health records
 *    - Doctor appointments
 *    - Vaccination schedules
 *    - Nutrition tips
 * 4. Connect to backend API when it's ready
 * 5. Add real authentication (JWT tokens, etc.)
 * 6. Add more validation and error handling
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * IMPORTANT NOTES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * - This is FRONTEND ONLY (no real backend yet)
 * - Data is stored in localStorage (not permanent)
 * - API calls are simulated with setTimeout
 * - Will be replaced with real backend later
 * - No actual authentication/security yet
 * - This is just a prototype/mockup
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
