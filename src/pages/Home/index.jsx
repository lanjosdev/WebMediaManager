// Funcionalidades / Libs:
import { useState, useContext, useEffect } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from "../../components/Header";

// Assets:

// Estilo:
import './home.scss';


export default function Home() {
    const {
        userDetails, 
        logoutUser, 
        carregaProjetosAutorizados
    } = useContext(UserContext);
    // console.log(userDetails);
    const [loadingProjetos, setLoadingProjetos] = useState(true);
    const [projetos, setProjetos] = useState([]);


    useEffect(()=> {
        function carregaProjetos() {
            carregaProjetosAutorizados()
            // .then(()=> {
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
                setProjetos(listaProjetos);
                setLoadingProjetos(false);
            }, 1500);
            
            // })           
        }
        carregaProjetos();
    }, [carregaProjetosAutorizados]);



    return (
        <div className='Container'>

            <Header userLevel={userDetails.loglevel} logout={logoutUser} />

            <main className="page-content">
                <div className="grid">

                    <h1>Bem-vindo(a) {userDetails.name}!</h1>
                    <p>
                        Abaixo você pode visualizar, adicionar e editar as mídias de acordo com o projeto selecionado.
                    </p>

                    
                    <div className="select-project">
                        <label htmlFor="projeto">Projeto selecionado:</label>
                        {loadingProjetos ? (
                            <select disabled>
                                <option value="">Buscando...</option>
                            </select>
                        ) : (
                            projetos.length === 0 ? (
                                <select style={{color: 'red'}}>
                                    <option>Nenhum projeto encontrado!</option>
                                </select>
                            ) : (
                                <select 
                                    id="projeto"
                                >
                                    <option value="">Samsung Flip</option>
                                    <option value="">Burguer King</option>
                                    <option value="">Champion Legue</option>
                                </select>
                            )
                        )}
                        
                    </div>

                    <div className="painel-midias">
                        <p>
                            <span>Nenhum projeto encontrado!</span> <br />
                            (Contate o administrador para você ser adicionado a um projeto)
                        </p>
                    </div>

                </div>
            </main> 

        </div>
    );
}