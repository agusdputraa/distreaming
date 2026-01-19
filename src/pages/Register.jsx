import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from "react-router-dom"
import Icon from '../Icon/Icon'
import FormInput from '../components/FormInput'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${API_BASE_URL}/auth/register`, {
                name, email, password, password_confirmation: confirmPassword
            });
            setSuccess(true);
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            setError(error?.response?.data?.message || "Registration failed. Please try again.");
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
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-gray-400">Join us! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <FormInput label="Full Name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
                        <FormInput label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                        <FormInput label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
                        <FormInput label="Confirm Password" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" />

                        <button type="submit" disabled={loading} className="w-full py-3 px-4 rounded-md text-sm font-semibold text-white bg-[#e50914] hover:bg-[#f40612] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>

                        <button type="button" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-600 rounded-md text-sm font-medium text-white bg-transparent hover:bg-white/10 transition-colors">
                            <Icon name="google" className="text-xl" />
                            Sign up with Google
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white font-medium hover:underline">Sign in</Link>
                        </p>
                    </div>
                    
                    {success && <div className="mt-4 p-3 bg-green-500/20 border border-green-500 text-green-400 rounded-md text-sm text-center">Account created! Redirecting to login...</div>}
                    {error && <div className="mt-4 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded-md text-sm text-center">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default Register
