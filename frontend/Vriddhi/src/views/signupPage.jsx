import AuthInput from "../components/authInput"
import GradientButton from "../components/gradientButton"
import logo from "../assets/logoWithName.svg"
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios"

function SignUpPage(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '', confirmPassword:''});
    const [apiError, setApiError] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("signup button clicked");
        if(!email || !password || !confirmPassword){
            setApiError("Please fill all the fields.");
            return;
        }

        if(password !== confirmPassword){
            setError((prev) => ({ ...prev, confirmPassword: "Passwords don't match." }));
            return;
        }

        if(!error.email && !error.password && !error.confirmPassword){
            try {
                const response = await axios.post("http://localhost:8000/user/register", {
                    email: email,
                    password: password,
                    username: email
                });
                if (response.status === 200) {
                    navigate('/login');
                }
            } catch (err) {
                if (err.response && err.response.status === 409) {
                    setApiError("User with this email already exists.");
                } else {
                    setApiError("Something went wrong. Please try again.");
                }
            }
        }
    };

    const navigateLogin = () => {
        navigate('/login')
    }

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

    const handleConfirmPasswordChange = (e) => {
        if (e.target.value !== password) {
            setError((prev) => ({
                ...prev,
                confirmPassword: "Passwords don't match."
            }));
        } else {
            setError((prev) => ({ ...prev, confirmPassword: '' }));
        }
        setConfirmPassword(e.target.value);
    };

    return(
        <div className="flex w-full h-full">
            <div className="flex items-center justify-center w-1/2 h-full bg-emerald-950">
                <img
                    src={logo}
                    className="w-1/3"
                    />
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-center bg-white py">
                <div className="flex flex-col items-center w-[400px] px-5 py-14 border rounded-4xl border-green-950">
                {apiError && <div className="text-red-600 mb-2">{apiError}</div>}
                    <h2 className="text-6xl text-green-950 font-sans mb-3">Sign Up</h2>
                    <form className="w-[80%] " onSubmit={handleSubmit}>
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
                        <AuthInput
                            id="confirmpassword"
                            value={confirmPassword}
                            label="Confirm Password"
                            type="password"
                            placeholder=""
                            onChange={handleConfirmPasswordChange}
                            error={error.confirmPassword}
                            />
                        <GradientButton
                            title="Sign Up"
                            type="submit"
                            // onClick={handleSubmit}
                            />
                    </form>
                    <span className="text-black text-sm pb-4">Already have an account? <span className="font-semibold text-emerald-950 cursor-pointer" onClick={navigateLogin}>Login</span></span>
                </div>
                
            </div>
        </div>
    )
}

export default SignUpPage