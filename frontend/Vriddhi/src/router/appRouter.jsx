import { Routes, Route} from "react-router"
import SignUpPage from "../views/signupPage"
import LoginPage from "../views/loginPage"
import Dashboard from "../views/dashboard"

function AppRouter(){
    return(
        <Routes>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}

export default AppRouter