import AuthInput from "../components/authInput"
import GradientButton from "../components/gradientButton"
import logo from "../assets/logoWithName.svg"

function SignUpPage(){
    return(
        <div className="flex w-full h-full">
            <div className="flex items-center justify-center w-1/2 h-full bg-emerald-950">
                <img
                    src={logo}
                    className="w-1/3"
                    />
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-center bg-white py">
                <div className="flex flex-col items-center w-[70%] px-5 py-14 border rounded-4xl border-green-950">
                    <h2 className="text-6xl text-green-950 font-sans mb-3">Sign Up</h2>
                    <form className="w-[80%] ">
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
                        <AuthInput
                            id="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            placeholder=""
                            />
                        <GradientButton
                            title="Sign Up"/>
                    </form>
                    <span className="text-black text-sm pb-4">Already have an account? <span className="font-semibold text-emerald-950 cursor-pointer">Login</span></span>
                </div>
                
            </div>
        </div>
    )
}

export default SignUpPage