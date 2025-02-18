import AuthInput from "../components/authInput"
import GradientButton from "../components/gradientButton"
import logo from "../assets/logoWithName.svg"
import {useNavigate} from "react-router-dom"

function LoginPage(){
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("hello");
        navigate('/dashboard')
    }

    const navigateSignup = () => {
        navigate('/signup')
    }

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
                    <h2 className="text-6xl text-green-950 font-sans mb-5">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col w-[80%] gap-2">
                        <AuthInput
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="eg. johndoe@gmail.com"
                            />
                        <AuthInput
                            id="password"
                            label="Password"
                            type="password"
                            placeholder=""
                            />
                        <GradientButton
                            title="Login"
                            onClick={handleSubmit}
                            />
                    </form>
                    <span className="text-black text-sm mt-2 pb-4">Don't have an account? <span className="font-semibold text-emerald-950 cursor-pointer" onClick={navigateSignup}>Register</span></span>
                </div>
                
            </div>
        </div>
    )
}

export default LoginPage