// Funcionalidades / Libs:
import { useState, useContext, useEffect } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from '../../components/Header';

// Assets:
// import Thumb from '../../assets/thumbModal.jpg';
import { MdImage, MdVideoLibrary } from 'react-icons/md';

// Estilo:
import './home.scss';


export default function Home() {
    const {
        userDetails, 
        logoutUser, 
        carregaProjetosAutorizados,
        carregaMidiasProjetc,
    } = useContext(UserContext);
    // console.log(userDetails);
    const [loadingProjetos, setLoadingProjetos] = useState(true);
    const [projetos, setProjetos] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');

    const [loadingMidias, setLoadingMidias] = useState(true);
    const [midias, setMidias] = useState([]);

    const puxaMidiasEffect = carregaMidiasProjetc;


    useEffect(()=> {
        function carregaProjetos() {
            console.log(userDetails.loglevel);
            // let levelUser = 
            //await
            // carregaProjetosAutorizados()
            // .then(()=> {
            setTimeout(()=> {
                let res = userDetails.loglevel === 1 ? [
                    {
                        id: 2,
                        nome: 'Burguer King'
                    },
                    {
                        id: 4,
                        nome: 'Champions League'
                    },
                    {
                        id: 0,
                        nome: 'Projeto sem midia'
                    }
                ] : [
                    {
                        id: 1,
                        nome: 'Samsung Flip'
                    },
                    {
                        id: 2,
                        nome: 'Burguer King'
                    },
                    {
                        id: 4,
                        nome: 'Champions League'
                    },
                    {
                        id: 5,
                        nome: 'Copa Feminina Visa'
                    },
                    {
                        id: 0,
                        nome: 'Projeto sem midia'
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
                
                setProjetos(listaProjetos);
                
                setLoadingProjetos(false);

                //await Carrega Midias de acordo com id do projeto (padrao o 1° q carrega):
                let listaMidias = [];
                // setTimeout(()=> {
                setProjetoSelecionado(listaProjetos[0].id);
                listaMidias = puxaMidiasEffect(listaProjetos[0].id);
                console.log(listaMidias);
                // }, 1500);
                
                setMidias(listaMidias);
                setLoadingMidias(false);
            }, 1500);
            // })           
        }
        carregaProjetos();
    }, [puxaMidiasEffect, userDetails]);

    function selectCarregaMidias(e) {
        setProjetoSelecionado(e.target.value);

        setLoadingMidias(true);

        //await Carrega Midias de acordo com id do projeto:
        let listaMidias = [];
        // setTimeout(()=> {
            listaMidias = carregaMidiasProjetc(e.target.value);
        // }, 1500);
        
        setMidias(listaMidias);

        setLoadingMidias(false);
    }

    function updateChecked(midia) {
        const newLista = [...midias];
    
        const n_check = (midia.checked === 1)? 0 : 1; // 0 ou 1
        newLista.map((item)=> {item.id === midia.id && (item.checked = n_check)});
        setMidias(newLista);
    }


    return (
        <div className='Container'>

            <Header userLevel={userDetails.loglevel} logout={logoutUser} />

            <main className="page-content">
                <div className="grid">

                    <h1>Bem-vindo(a) {userDetails.loglevel === 100 ? 'Administrador' : userDetails.name}!</h1>
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
                                    onChange={selectCarregaMidias}
                                >
                                    {projetos.map((projeto, idx)=> (
                                        <option key={idx} value={projeto.id} title={projeto.id}>
                                            {projeto.nomeProjeto}
                                        </option>
                                    ))}
                                </select>

                            )
                        )}
                    </div>

                    <div className="painel-midias">
                        {loadingMidias ? (

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
                                        {midias.map((midia, idx)=> (
                                        <li 
                                            key={midia.id} 
                                            className="item-midia"
                                        >
                                            <div className={midia.checked === 1 ? "item-content ativa" : "item-content"}>
                                                {midia.checked === 0 && (
                                                    <div className="midia-disable">
                                                        <span>Mídia desativada</span>
                                                    </div>
                                                )}
                                                <img src={midia.media_thumb
} alt="seila" />
                                                <div className="item-indice">
                                                    <p>{idx + 1 + ""}</p>
                                                    <span>{midia.media_type === 1 ? <MdImage/> : <MdVideoLibrary/>}</span>
                                                </div>
                                            </div>
                                            <input 
                                                type="checkbox"
                                                id={midia.id}
                                                checked={midia.checked}
                                                onChange={()=> updateChecked(midia)}
                                                title="Ativa/Desativa" 
                                            />
                                        </li>
                                        ))}
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