import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Programs from './pages/Programs';
import Trainers from './pages/Trainers';
import Nutrition from './pages/Nutrition';
import Contact from './pages/Contact';
import Workouts from './pages/Workouts';
import Transformations from './pages/Transformations';
import Recovery from './pages/Recovery';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/transformations" element={<Transformations />} />
                <Route path="/recovery" element={<Recovery />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/trainer"
                  element={
                    <ProtectedRoute allowedRoles={['trainer']}>
                      <TrainerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/customer"
                  element={
                    <ProtectedRoute allowedRoles={['customer']}>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}