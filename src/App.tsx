import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import Resume from './pages/Resume';
import Portfolio from './pages/Porfolio';
import UserdatatForm from './components/userData/UserdataForm';
import { useUser } from './hooks/useUser';

export default function App() {

  const user = useUser();
  const userName = user?.user?.name;

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
          children={
            <>
              <Route path="/resumes" element={<Resume />} />
              <Route path="/portfolios" element={<Portfolio />} />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
            }
          />
          <Route
            path={`/user/${userName}`}
            element={
            <ProtectedRoute>
              <UserdatatForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}