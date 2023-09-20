// Funcionalidades / Libs:
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';


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
    async function logarUser(user) {
        setLoadingAuth(true);

        let userLevel = user.substr(0, 3); 

        // Simulando function API USER_LOGIN(email, password).then...
        setTimeout(()=> {
            let res = {
                id: 1,
                name: userLevel === 'adm' ? "Administrador" : "Fulano",
                email: "admin@bizsys.com.br",
                emailverifiedat: "2023-07-28T14:54:39.000000Z",
                loglevel: userLevel === 'adm' ? 100 : 1,
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

    // Busca projetos autorizados:
    async function carregaProjetosAutorizados() {
        // Simulando function API await PROJECTS_GET_ALL.then...
        setTimeout(()=> {
            let res = [
                {
                    id: 1,
                    nome: 'Samsung Flip'
                },
                {
                    id: 2,
                    nome: 'Burguer King'
                },
                {
                    id: 3,
                    nome: 'Champions League'
                }
            ];

            if(res.length === 0) {
                console.log('NENHUM PROJETO ENCONTRADO!');
                return;
            }

            let listaProjetos = [];
            res.forEach((projeto)=> {
                listaProjetos.push({
                    id: projeto.id,
                    nomeProjeto: projeto.nome
                })                
            })
            console.log(listaProjetos);

            return;
        }, 1500);
        // Simulando then.        
    }

    // Busca midias All por id porject:
    function carregaMidiasProjetc(id) {
        const token = JSON.parse(Cookies.get('userLocal')).token;

        if(token) {
            //Puxa todas as midias da API:
            let midiasAll = [];
            let res = [];

            if(id == 1) {
            // Simulando functionAPI await MEDIA_GET_ALLbyID(token, id).then...
            // setTimeout(()=> {
                res = [
                    {
                        id: 1,
                        media_thumb: "https://samsungbrshop.vtexassets.com/assets/vtex.file-manager-graphql/images/38e3c375-95d2-40b8-8b2e-7a2e9d4f5257___cb5dc9fc1f3f14b297033dfd96b19b3c.png",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 2,
                        media_thumb: "https://samsungbrshop.vtexassets.com/arquivos/ids/187851/SM-F711_ZFlip3_5G_TableTopL30_Phantomblack.jpg?v=637843450120070000",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 3,
                        media_thumb: "https://images.samsung.com/br/smartphones/galaxy-z-flip5/images/galaxy-z-flip5-highlights-flexwindow-multi-widget-view-end-mo.jpg?imbypass=true",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 0,
                        checked_by: 0,
                    },
                ];

                midiasAll = res;
            } else if(id == 2) {
                res = [
                    {
                        id: 1,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpT7cFg1IzgYka2qbfezFO1cDC_1xfjWJO-g&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 13,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrdM_T36gZJChvZumVIZnk6rVcomU1DHvfGW9o2lboorVatBelWkO-0ZDmgjqq0M1eu64&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 15,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfqUS7fLwgLvahFP1pFNyAV3piZ1ldfzJ0Cuca-OxAK7v7PGgDZscTemXMO0JguN-AuA&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 2,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlxmFxwTQ8bC7IWnRfpZ6hGogdSoJzXJbkb4ipye7owS5koKBUVt9lFSAHXP94tb3P7E&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 3,
                        media_thumb: "https://static.ifood-static.com.br/image/upload/t_medium/pratos/6e73dce2-a17f-4aef-9035-1409cea198fe/202305161741_2U3Y_i.jpg",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 4,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQylbN3gKOvxVHvDKU3gKJ-tWnuXw5xXeY5l0DWz-LQKWR1emzLuij8Aldz5OYlo9khLYs&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 5,
                        media_thumb: "https://i.pinimg.com/736x/d6/69/87/d669878a7cd7323fffc72e69da92f7e8.jpg",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 6,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyIkYo5eAHk5N73O60AjklhWaCoTT3b2EZ-CAghEkEstSsjHIQDuL0WKwMe-m2c_FV2Zg&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 7,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNhjrpj4YrZOWsqi9CVuv6z_Aqj4cPY4joM2M_L79xV_h_cQnACksMkvVIDwtaCg_NkU&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 8,
                        media_thumb: "https://cdn.canaldaimprensa.com.br/canaldaimprensa-home/2023/05/burguerking_canal.png",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 9,
                        media_thumb: "https://img.quizur.com/f/img6298fc97da52e5.35164307.jpg?lastEdited=1654193328",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 10,
                        media_thumb: "https://www.milkpoint.com.br/img/artigo/conteudo/79329/",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    {
                        id: 11,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrdM_T36gZJChvZumVIZnk6rVcomU1DHvfGW9o2lboorVatBelWkO-0ZDmgjqq0M1eu64&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 1,
                        checked_by: 0,
                    },
                    // {
                    //     id: 12,
                    //     media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfqUS7fLwgLvahFP1pFNyAV3piZ1ldfzJ0Cuca-OxAK7v7PGgDZscTemXMO0JguN-AuA&usqp=CAU",
                    //     media_type: 1,
                    //     media_dimensions: "3840x2160",
                    //     checked: 1,
                    //     checked_by: 0,
                    // },
                    // {
                    //     id: 14,
                    //     media_thumb: "https://www.w3schools.com/html/mov_bbb.mp4",
                    //     media_type: 2,
                    //     media_dimensions: "3840x2160",
                    //     checked: 1,
                    //     checked_by: 0,
                    // }
                ];

                midiasAll = res;
            } else if(id == 4) {
                res = [
                    {
                        id: 1,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiODlAIJl_aB6FSmq5ZQDhyTdqmLLKfbdgKLPYgawV2_-p0G3E8Usyh0G3zbvp72u3Lis&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 0,
                        checked_by: 0,
                    },
                    {
                        id: 2,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkS3ZPVfWFonvam5PqvJbWUnBy84LW4tLBFRTRnd1xSVi8CsMHka2bwrVnrld_j7EDRpo&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 0,
                        checked_by: 0,
                    },
                    {
                        id: 3,
                        media_thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdvbAoTZNQ3BEYVZXs6BIrdcUeilcRNaRqSpOg1moZXyCuf6V-c9juz5TPfbKyIjmm40&usqp=CAU",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 0,
                        checked_by: 0,
                    },
                    {
                        id: 4,
                        media_thumb: "https://pbs.twimg.com/media/FS8smOKXoAAFVc-.jpg",
                        media_type: 1,
                        media_dimensions: "3840x2160",
                        checked: 0,
                        checked_by: 0,
                    },
                ];

                midiasAll = res;
            }

                //Puxa a sequencia da API e ordena as midias em um nova array:
                console.log(midiasAll);
                return midiasAll;
            // }, 1500);
            
        }
    }

    // Busca todos os usuarios:
    function buscaUsersAll() {
        const token = JSON.parse(Cookies.get('userLocal')).token;
    
        if(token) {
            //Puxa todas os users da API:
            let usersAll = [];
            let res = [];

            // Simulando functionAPI await USER_GET_ALL(token).then...
            // setTimeout(()=> {
                res = [
                    {
                        id: 1,
                        name: "Admin",
                        email: "admin@bizsys.com.br",
                        loglevel: 100,
                        status: 1
                    },
                    {
                        id: 2,
                        name: "Renato",
                        email: "renato@bizsys.com.br",
                        loglevel: 100,
                        status: 1
                    },
                    {
                        id: 3,
                        name: "Cliente Samsung",
                        email: "samsung@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 4,
                        name: "bizsys",
                        email: "biz@bizsys.com.br",
                        loglevel: 100,
                        status: 0
                    },
                    {
                        id: 5,
                        name: "Lucas",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 6,
                        name: "Usuario Teste",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 7,
                        name: "Operador",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 8,
                        name: "Cliente",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 0
                    },
                    {
                        id: 9,
                        name: "Renato",
                        email: "renato@bizsys.com.br",
                        loglevel: 100,
                        status: 1
                    },
                    {
                        id: 10,
                        name: "Cliente Samsung",
                        email: "samsung@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 11,
                        name: "bizsys",
                        email: "biz@bizsys.com.br",
                        loglevel: 100,
                        status: 0
                    },
                    {
                        id: 12,
                        name: "Lucas",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 13,
                        name: "Usuario Teste",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 14,
                        name: "Operador",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 15,
                        name: "Cliente",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 0
                    },
                    {
                        id: 16,
                        name: "Admin",
                        email: "admin@bizsys.com.br",
                        loglevel: 100,
                        status: 1
                    },
                    {
                        id: 17,
                        name: "Renato",
                        email: "renato@bizsys.com.br",
                        loglevel: 100,
                        status: 1
                    },
                    {
                        id: 18,
                        name: "Cliente Samsung",
                        email: "samsung@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 19,
                        name: "bizsys",
                        email: "biz@bizsys.com.br",
                        loglevel: 100,
                        status: 0
                    },
                    {
                        id: 20,
                        name: "Lucas",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 21,
                        name: "Usuario Teste",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 22,
                        name: "Operador",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 23,
                        name: "Cliente",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 0
                    },
                    {
                        id: 24,
                        name: "Renato",
                        email: "renato@bizsys.com.br",
                        loglevel: 100,
                        status: 1
                    },
                    {
                        id: 25,
                        name: "Cliente Samsung",
                        email: "samsung@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 26,
                        name: "bizsys",
                        email: "biz@bizsys.com.br",
                        loglevel: 100,
                        status: 0
                    },
                    {
                        id: 27,
                        name: "Lucas",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 28,
                        name: "Usuario Teste",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 29,
                        name: "Operador",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                    {
                        id: 30,
                        name: "Cliente",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 0
                    },
                    {
                        id: 31,
                        name: "Cliente",
                        email: "biz@bizsys.com.br",
                        loglevel: 1,
                        status: 1
                    },
                ];

                usersAll = res;
              

                // console.log(usersAll);
                return usersAll;
            // }, 1500);
        }

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
                carregaProjetosAutorizados,
                carregaMidiasProjetc,
                buscaUsersAll,
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