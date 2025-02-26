import AuthInput from "../components/authInput";
import GradientButton from "../components/gradientButton";
import logo from "../assets/logoWithName.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error.email && !error.password) {
            navigate('/dashboard');
        }
    };

    const navigateSignup = () => {
        navigate('/signup');
    };

    const handleEmailChange = (e) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!regex.test(e.target.value)) {
            setError((prev) => ({ ...prev, email: "Please enter a valid email address" }));
        } else {
            setError((prev) => ({ ...prev, email: '' }));
        }
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!regex.test(e.target.value)) {
            setError((prev) => ({
                ...prev,
                password: 'Password must be at least 8 characters long, with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
            }));
        } else {
            setError((prev) => ({ ...prev, password: '' }));
        }
        setPassword(e.target.value);
    };

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col items-center justify-center w-1/2 h-full bg-emerald-950">
                <img
                    src={logo}
                    className="w-1/4"
                    alt="Logo"
                />
                <span className="mt-4 text-7xl font-stretch-110% font-thin">Welcome back!</span>
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-center bg-white">
                <div className="flex flex-col items-center w-[400px] px-5 py-14 border rounded-4xl border-green-950">
                    <h2 className="text-6xl text-green-950 font-sans mb-5">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col w-[80%] gap-2">
                        <AuthInput
                            id="email"
                            value={email}
                            label="Email"
                            type="email"
                            placeholder="eg. johndoe@gmail.com"
                            onChange={handleEmailChange}
                            error = {error.email}
                        />
                        <AuthInput
                            id="password"
                            value={password}
                            label="Password"
                            type="password"
                            placeholder=""
                            onChange={handlePasswordChange}
                            error={error.password}
                        />
                        <GradientButton
                            title="Login"
                            onClick={handleSubmit}
                        />
                    </form>
                    <span className="text-black text-sm mt-2 pb-4">
                        Don't have an account? <span className="font-semibold text-emerald-950 cursor-pointer" onClick={navigateSignup}>Register</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
