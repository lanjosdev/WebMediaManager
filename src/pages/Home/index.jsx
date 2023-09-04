// Funcionalidades / Libs:
import { useState, useContext, useEffect } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from "../../components/Header";

// Assets:
import Thumb from '../../assets/thumbModal.jpg';

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
    const [projetoSelecionado, setProjetoSelecionado] = useState('');

    // const [loadingMidias, setLoadingMidias] = useState(true);
    const [midias, setMidias] = useState([2]);


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
                    // {
                    //     id: 3,
                    //     nome: 'Champions League'
                    // }
                ];
    
                if(res.length === 0) {
                    console.log('NENHUM PROJETO ENCONTRADO!');
                    return;
                } else {
                    setProjetoSelecionado(0); //o 1º selecionado como padrão
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
                        <label>Projeto selecionado:</label>
                        {loadingProjetos ? (

                            <select disabled>
                                <option value="">Buscando...</option>
                            </select>

                        ) : (
                            projetos.length === 0 ? (

                                <select style={{color: 'red'}}>
                                    <option value=''>Nenhum projeto encontrado!</option>
                                </select>

                            ) : (

                                <select 
                                    value={projetoSelecionado}
                                    onChange={(e)=> setProjetoSelecionado(e.target.value)}
                                >
                                    {projetos.map((projeto, idx)=> (
                                        <option key={idx} value={idx} title={idx}>
                                            {projeto.nomeProjeto}
                                        </option>
                                    ))}
                                </select>

                            )
                        )}
                    </div>

                    <div className="painel-midias">
                        {loadingProjetos ? (

                            <p className="loading-midias">
                                <strong>Carregando Mídias...</strong>
                            </p>

                        ) : (
                            projetos.length === 0 ? (

                                <p className="not-projects">
                                    <span>Nenhum projeto encontrado!</span> <br />
                                    (Contate o administrador para você ser adicionado a um projeto)
                                </p>

                            ) : (
                                <>
                                <div className='cabecalho-painel'>
                                    <h2>Lista de mídias</h2>
                                    {midias.length !== 0 && 
                                    <button className="add-midia">+ Add mídia</button>}
                                </div>

                                <div className="content-painel">
                                    
                                {midias.length === 0 ? (

                                    <div className="not-medias">
                                        <p>
                                            Nenhuma mídia foi adicionada!
                                        </p>
                                        <button className="add-midia">
                                            + Add mídia
                                        </button>
                                    </div>

                                ) : (
                                    <>
                                    <p className="sub-cabecalho">
                                        Basta arrastar e soltar as mídias para ordernar a sequência de exibição:
                                    </p>

                                    <ul className="list-midias">
                                        {/* roda o map a partir daqui */}
                                    <li className="item-midia">
                                        <div className="item-content">
                                            <img src={Thumb} alt="seila" />
                                            <div className="item-indice">1</div>
                                        </div>
                                        <input 
                                            type="checkbox"
                                            title="Ativa/Desativa" 
                                        />
                                    </li>

                                    <li className="item-midia">
                                        <div className="item-content">
                                            <img src={Thumb} alt="seila" />
                                            <div className="item-indice">2</div>
                                        </div>
                                        <input 
                                            type="checkbox"
                                            title="Ativa/Desativa" 
                                        />
                                    </li>

                                    <li className="item-midia">
                                        <div className="item-content">
                                            <img src={Thumb} alt="seila" />
                                            <div className="item-indice">3</div>
                                        </div>
                                        <input 
                                            type="checkbox"
                                            title="Ativa/Desativa" 
                                        />
                                    </li>

                                    </ul>
                                    </>
                                )}
                                </div>
                                </>
                            )
                        )}
                        
                    </div>

                </div>
            </main> 

        </div>
    );
}