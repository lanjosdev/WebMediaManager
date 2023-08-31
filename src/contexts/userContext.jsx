// Funcionalidades / Libs:
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { USER_LOGIN } from "../API/userApi";

import Cookies from "js-cookie";
import { toast } from "react-toastify";


// Cria o Contexto e deixe exportado:
export const UserContext = createContext({});

// Provedor do contexto acima (prove os values(var, states, metodos, etc) aos filhos desse provedor):
export default function UserProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigate = useNavigate();

//Usar um useEffect que se tiver logado direcione para page home
    // useEffect(()=> {
    //     async function checkUserLogado(){
    //         const tokenLocal = localStorage.getItem('tokenUser');
    //         // seria bom tbm fazer o check se o token ainda está valido

    //         if(tokenLocal){
    //             setUser(JSON.parse(tokenLocal));
    //         }

    //         setLoading(false);
    //     }
    //     checkUserLogado();
    // }, [])

    // useEffect(()=> {
    //   async function checkToken() {
    //     let t = Cookies.get('token');
    //     if(t){
    //         let result_token = await CHECK_TOKEN(t);
    //         if(result_token === true)
    //             navigate('/home');
    //         else
    //         {
    //             Cookies.remove('token');
    //             navigate('/');
    //         }
    //     }
    //   }
    //   checkToken();
    // }, [navigate]);
    

    // Logar usuario:
    async function logarUser(email, password) {
        setLoadingAuth(true);

        // Simulando USER_LOGIN(email, password).then...
        setTimeout(()=> {
        
            let res = {
                id: 1,
                name: "Renato",
                email: "admin@bizsys.com.br",
                emailverifiedat: "2023-07-28T14:54:39.000000Z",
                loglevel: 1,
                createdat: "2023-07-28T14:54:39.000000Z",
                updatedat: null,
                deletedat: null,
                token: "2|NcZhZ3DFL3GyXrJyEyNokJDSIkjhVxFndUXe6Q5p",
            }
    
            setUserDetails(res);
            Cookies.set('token', res.token, { expires: 1 });
            toast.success('LOGIN SUCCESS');
            setLoadingAuth(false);
            console.log(userDetails);

            const formulario = document.querySelector('form');
            formulario.reset();
            navigate('/home');

        }, 1500)        
        // Simulando then.

        // try {
        // await USER_LOGIN(email, password)
        // .then((res)=> {
        //     Cookies.set('token', res.token, { expires: 1 });
        //     toast.success('LOGIN SUCCESS');
        //     // navigate('/home');
        //     navigate('/home', { replace: true });
        // })
        // } catch(error) {
        //     toast.error("LOGIN INVÁLIDO!");
        //     console.log('DEU ERRO NO LOGIN');
        //     console.log(error);
        // }
        
        // setLoadingAuth(false);      
    }

    // Cadastrar usuario:
    async function addUser(email, password, name) {
        setLoadingAuth(true);
        
        // função de criar conta
        // chama função USER_ADD na userApi.js


        setLoadingAuth(false);
    }

    // Salvar dados do user no cookies:
    function storageUser(data) {
        // localStorage.setItem('tokenUser', JSON.stringify(data));
    }

    async function logout() {
        // await signOut(auth);
        // localStorage.removeItem('tokenUser');
        // setUser(null);
    }



    // Retorna os values para os filhos:
    return (
        <UserContext.Provider
            value={{
                logado: !!userDetails, //se for null = false OU true
                userDetails,
                loadingAuth,
                logarUser,
                addUser,
                logout,
                storageUser,
                setUserDetails
            }}
        >
            {children}
        </UserContext.Provider>
    )
}