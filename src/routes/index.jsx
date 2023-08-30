// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Login from "../pages/Login";


// Components:
// import PrivateRoute from "./PrivateRoute";


export function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={ <Login/> } />


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