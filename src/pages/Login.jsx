import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Icon from '../Icon/Icon'
import FormInput from '../components/FormInput'
import { useAuth } from '../context/AuthContext'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    // Check if form is valid (all required fields filled)
    const isFormValid = email.trim() !== "" && password.trim() !== "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            const token = res?.data?.token;
            
            if (token) {
                login(token);
                setSuccess(true);
                setTimeout(() => navigate("/"), 1000);
            } else {
                setError("Login berhasil tapi token tidak diterima");
            }
        } catch (error) {
            // Handle backend validation errors
            const response = error?.response?.data;
            
            if (response?.errors) {
                // Laravel validation errors format
                const errorMessages = Object.values(response.errors).flat();
                setError(errorMessages.join('. '));
            } else if (response?.message) {
                setError(response.message);
            } else {
                setError("Login gagal. Email atau password salah.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#141414] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-end px-6 md:px-12 py-4">
                <Link to="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <Icon name="x" size={24} className="text-white" />
                </Link>
            </div>

            {/* Form Container */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-4xl bg-black/75 rounded-lg p-8 md:p-12 border border-gray-800">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
                        <p className="text-gray-400">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <FormInput label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                        <FormInput label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" type="checkbox" className="h-4 w-4 border-gray-600 bg-[#333] rounded cursor-pointer" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">Remember me</label>
                            </div>
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Forgot password?</a>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || !isFormValid} 
                            className="w-full py-3 px-4 rounded-md text-sm font-semibold text-white bg-[#e50914] hover:bg-[#f40612] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                        <button type="button" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-600 rounded-md text-sm font-medium text-white bg-transparent hover:bg-white/10 transition-colors">
                            <Icon name="google" className="text-xl" />
                            Sign in with Google
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-white font-medium hover:underline">Sign up</Link>
                        </p>
                    </div>
                    
                    {success && <div className="mt-4 p-3 bg-green-500/20 border border-green-500 text-green-400 rounded-md text-sm text-center">Login berhasil! Redirecting...</div>}
                    {error && <div className="mt-4 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-md text-sm text-center">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default Login