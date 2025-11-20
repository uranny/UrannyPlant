import { Route, Routes } from "react-router";
import Main from "../pages/main";
import Layout from "./Layout";
import Loading from "../pages/loading";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
export default function RoutesSetup() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Loading/>}/>
                <Route path="/main" element={<Main />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<Signup />} />
            </Route>
        </Routes>
    )
}