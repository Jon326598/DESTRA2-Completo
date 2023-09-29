import Login from "./pages/login";
import Home from "./pages/home";
import MembroPage from "./pages/membros";

import Menu from "./components/menu";

import {BrowserRouter, Routes, Route} from 'react-router-dom'


function Router(){
    return(
        <BrowserRouter>

            <Menu/>
            
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/membros" element={<MembroPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;