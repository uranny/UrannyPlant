import { Route, Routes } from "react-router";
import Main from "../pages/main";
import Signin from "../pages/signin/indext";
import Signup from "../pages/signup/indext";
import Layout from "./Layout";
export default function RoutesSetup() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Main/>}/>
                <Route path="/sign-in" element={<Signin/>}/>
                <Route path="/sign-up" element={<Signup/>}/>
            </Route>
        </Routes>
    )
}