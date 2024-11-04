import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import MainPage from './components/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import Resumes from './components/Resumes';
import Portfolios from './components/Portfolios';

export default function App() {
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
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/portfolios" element={<Portfolios />} />
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
      </Routes>
    </Router>
  );
}