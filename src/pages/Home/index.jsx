// Funcionalidades / Libs:
import { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from '../../components/Header';
import { ModalAdd } from "../../components/Modal/ModalMedia/modalAdd";

// Assets:
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

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [midiaSelecionada, setMidiaSelecionada] = useState(null);

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        
        console.log(result);
        return result;
    };   


    useEffect(()=> {
        function carregaProjetos() {
            // console.log(userDetails.loglevel);
            
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
                // setProjetoSelecionado(listaProjetos[0].id);
                listaMidias = carregaMidiasProjetc(listaProjetos[0].id);
                // }, 1500);
                
                setMidias(listaMidias);
                setLoadingMidias(false);
            }, 1500);
            // })           
        }
        carregaProjetos();
    }, [userDetails, carregaMidiasProjetc]);

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

    function callModalAddMidia() {
        setMidiaSelecionada(null);

        setModalIsOpen(true);
    }

    function callModalEditMidia(midiaDetails) {
        setMidiaSelecionada(midiaDetails);

        setModalIsOpen(true);
    }


    return (
        <DragDropContext
            onDragEnd={(result) => {
                const { source, destination } = result;
                if (!destination) {
                return;
                }
                if (
                source.index === destination.index &&
                source.droppableId === destination.droppableId
                ) {
                return;
                }

                // setListaMidias((prevMidias) =>
                //   reorder(prevMidias, source.index, destination.index)
                // );
                let newOrder = reorder(midias, source.index, destination.index);
                console.log(newOrder);

                setMidias(newOrder);
                // dragUpdateSequence(newOrder);
            }}
        >

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
                                    {projetos.map((projeto)=> (
                                        <option key={projeto.id} value={projeto.id} title={projeto.id}>
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
                                    <button className="add-midia" onClick={callModalAddMidia}>+ Add mídia</button>}
                                </div>

                                <div className="content-painel">
                                    
                                {midias.length === 0 ? (

                                    <div className="not-medias">
                                        <p>
                                            Nenhuma mídia foi adicionada!
                                        </p>
                                        <button className="add-midia" onClick={()=> setModalIsOpen(true)}>
                                            + Add mídia
                                        </button>
                                    </div>

                                ) : (
                                    <>
                                    <p className="sub-cabecalho">
                                        Basta arrastar e soltar as mídias para ordernar a sequência de exibição:
                                    </p>

                                    <Droppable droppableId="list-midias" direction="horizontal">
                                    {(droppableProvided) => (
                                    <ul 
                                        {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                        className="list-midias"
                                    >
                                        {midias.map((midia, idx)=> (
                                        <Draggable key={midia.id} draggableId={String(midia.id)} index={idx}>
                                        {(draggableProvided) => (
                                        <li 
                                            {...draggableProvided.draggableProps}
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.dragHandleProps}
                                            className="item-midia"
                                        >
                                            <div 
                                                className={midia.checked === 1 ? "item-content ativa" : "item-content"} 
                                                onClick={()=> callModalEditMidia(midia)}
                                                title="Clique p/ editar"
                                            >
                                                {midia.checked === 0 && (
                                                    <div className="midia-disable">
                                                        <span>Mídia desativada</span>
                                                    </div>
                                                )}
                                                <img src={midia.media_thumb
} alt="seila" />
                                                <div className="item-indice">
                                                    <p>{idx + 1 + "º"}</p>
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
                                        )}
                                        </Draggable>
                                        ))}
                                    </ul>
                                    )}
                                    </Droppable>
                                    </>
                                )}
                                </div>
                                </>
                            )
                        )}
                        
                    </div>

                </div>
            </main> 

            {modalIsOpen && <ModalAdd
                                closeModal={()=> setModalIsOpen(false)}
                                action='add'
                                // title='Adicionando mídia'
                                midiaEdit={midiaSelecionada}
            />}

        </div>

        </DragDropContext>
    );
}