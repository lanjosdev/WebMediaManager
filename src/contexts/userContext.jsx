// Funcionalidades / Libs:
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import PropTypes, { func } from 'prop-types';


// Cria o Contexto e deixe exportado:
export const UserContext = createContext({});

// Provedor do contexto acima (prove os values(var, states, metodos, etc) aos filhos desse provedor):
export default function UserProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loadingRoute, setLoadingRoute] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigate = useNavigate();

    // useEffect Carrega dados do Cookies + Check validade token:
    useEffect(()=> {
        async function checkUserLogado() {
            const userCookie = Cookies.get('userLocal');

            if(userCookie) {
                // aqui seria bom tbm fazer um checkToken para ver se é valido oq está no cokkie (senão: remove cookie + direcionada para login)
                setUserDetails(JSON.parse(userCookie));
            } 

            setLoadingRoute(false);
        } 
        checkUserLogado();
    }, []);

    // Logar usuario:
    async function logarUser() {
        setLoadingAuth(true);

        // Simulando function API USER_LOGIN(email, password).then...
        setTimeout(()=> {
            let res = {
                id: 1,
                name: "Renato",
                email: "admin@bizsys.com.br",
                emailverifiedat: "2023-07-28T14:54:39.000000Z",
                loglevel: 100,
                createdat: "2023-07-28T14:54:39.000000Z",
                updatedat: null,
                deletedat: null,
                token: "2|NcZhZ3DFL3GyXrJyEyNokJDSIkjhVxFndUXe6Q5p"
            };
    
            setUserDetails(res);
            Cookies.set('userLocal', JSON.stringify(res), { expires: 1 });
            toast.success('LOGIN SUCCESS');

            setLoadingAuth(false);
            const formulario = document.querySelector('form');
            formulario.reset();
            navigate('/home');
        }, 1500);       
        // Simulando then.

        // setLoadingAuth(false);
    }

    // Logout usuario:
    function logoutUser() {
        Cookies.remove('userLocal');
        setUserDetails(null);                
    }

    
    return (
        <UserContext.Provider
            value={{
                logado: !!userDetails, //se for null = false OU true
                userDetails,
                loadingRoute,
                loadingAuth,                
                logarUser,
                logoutUser
            }}  
        >
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.array.isRequired,
}