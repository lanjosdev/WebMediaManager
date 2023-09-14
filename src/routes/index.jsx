// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Login from "../pages/Login";
import Home from "../pages/Home";
import Projetos from "../pages/Projetos";

// Components:
import PrivateRoute from "./PrivateRoute";


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />

            {/* HOME - MEDIAS */}
            <Route path="/home" element={
                <PrivateRoute path="/home" element={<Home/>} />
            } />
            {/* HOME - MEDIAS */}

            {/* PROJETOS */}
            {/* <Route path="/projetos" element={ 
                <PrivateRoute> <Projetos/> </PrivateRoute>
            } /> */}
            <Route path="/projetos" element={
                <PrivateRoute path="/projetos" element={<Projetos/>} />
            } />
            {/* PROJETOS */}

            {/* CHAMADOS */}
            {/* <Route path="/dashboard" element={ 
                <PrivateRoute> <Dashboard/> </PrivateRoute>  
            }/>
            <Route path="/dashboard/new-chamado" element={ 
                <PrivateRoute> <NewChamado/> </PrivateRoute>  
            }/>
            <Route path="/dashboard/edit-chamado/:id" element={ 
                <PrivateRoute> <NewChamado/> </PrivateRoute>  
            }/>  */}
        </Routes>        
    )
}