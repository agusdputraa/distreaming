import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/Homepage'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminMovies from './pages/AdminMovies'
import AdminGenres from './pages/AdminGenres'
import AdminMovieForm from './pages/AdminMovieForm'
import AdminGenreForm from './pages/AdminGenreForm'
import AdminUsers from './pages/AdminUsers'
import AdminUserForm from './pages/AdminUserForm'

import ProtectedRoute from './routes/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/genres" element={<Navigate to="/movies" replace />} />
          <Route path="/search" element={<Navigate to="/movies" replace />} />
          <Route path="/movie-detail/:id" element={<MovieDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Navigate to="/admin/movies" replace />} />
            <Route path="/admin/movies" element={<AdminMovies />} />
            <Route path="/admin/genres" element={<AdminGenres />} />
            <Route path="/admin/movie" element={<AdminMovieForm />} />
            <Route path="/admin/movie/:id" element={<AdminMovieForm />} />
            <Route path="/admin/genre" element={<AdminGenreForm />} />
            <Route path="/admin/genre/:id" element={<AdminGenreForm />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/user" element={<AdminUserForm />} />
            <Route path="/admin/user/:id" element={<AdminUserForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
