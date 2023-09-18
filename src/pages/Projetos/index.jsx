// Funcionalidades / Libs:
import { useState, useContext, useEffect } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from '../../components/Header';
// import { ModalMedia } from "../../components/Modal/ModalMedia/modalMedia";

// Assets:
import { BiSolidSpreadsheet, BiBlock } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi'

// Estilo:
import './projetos.scss';


export default function Projetos() {
    const [loadingProjetos, setLoadingProjetos] = useState(false); ///////////////
    const [projetos, setProjetos] = useState([1]); ////////

    const {
        userDetails, 
        logoutUser, 
    } = useContext(UserContext);


    return (
        <div className='Container'>

            <Header userLevel={userDetails.loglevel} logout={logoutUser} />

            <main className="page-content">
                <div className="grid">

                    <h1 className="title"><BiSolidSpreadsheet/> <span>Projetos</span></h1>
                    <p>
                        Abaixo você pode visualizar, adicionar e editar projetos cadastrados.
                    </p>

                    <div className="campo-pesquisa">
                        <label htmlFor="pesquisa-nome">Pesquise por nome:</label>
                        <div className="div-input">
                            <input
                            type="text"
                            id="pesquisa-nome"
                            placeholder="Digite aqui..."
                            />
                            
                            <FiSearch/>
                        </div>
                    </div>

                    <div className="painel-table">
                        {loadingProjetos ? (

                            <p className="loading-usuarios">
                                <strong>Carregando Projetos...</strong>
                            </p>

                        ) : (
                            <>

                            <div className='cabecalho-painel'>
                                <h2>Projetos Cadastrados</h2>
                                
                                {projetos.length !== 0 && 
                                <button className="add-projeto" onClick=''>Novo Projeto</button>}
                            </div>

                            <div className="content-painel">
                                {projetos.length === 0 ? (

                                <div className="not-projetos">
                                    <p>
                                        Nenhum projeto foi adicionado!
                                    </p>
                                    <button className="add-projeto" onClick=''>
                                        + Novo Projeto
                                    </button>
                                </div>

                                ) : (

                                <table className="table-projetos">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Projeto</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {/* map aqui */}
                                        <tr>
                                            <td data-label="index">1</td>

                                            <td data-label="Projeto">Samsung Flip</td>

                                            <td data-label="Status">
                                                <span 
                                                className="badge" 
                                                style={{backgroundColor: '#5cb85c'}}
                                                // style={{backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : chamado.status === 'Atendido' ? '#999' : '#1a449e' }}
                                                >
                                                Ativo
                                                </span>
                                            </td>

                                            <td data-label="Ações">
                                                <div className="actions">
                                                    <button 
                                                        className="action" 
                                                        style={{ backgroundColor: '#3583f6' }}
                                                        // onClick={()=> callModal(chamado)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="action" 
                                                        // onClick={()=> navigate(`edit-chamado/${chamado.id}`)}
                                                        style={{ backgroundColor: '#f63535' }}
                                                        title='Desativar/Ativar'
                                                    >
                                                        <BiBlock/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* map fim */}
                                        <tr>
                                            <td data-label="index">2</td>

                                            <td data-label="Projeto">Burguer King</td>

                                            <td data-label="Status">
                                                <span 
                                                className="badge" 
                                                style={{backgroundColor: '#5cb85c'}}
                                                // style={{backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : chamado.status === 'Atendido' ? '#999' : '#1a449e' }}
                                                >
                                                Ativo
                                                </span>
                                            </td>

                                            <td data-label="Ações">
                                                <div className="actions">
                                                    <button 
                                                        className="action" 
                                                        style={{ backgroundColor: '#3583f6' }}
                                                        // onClick={()=> callModal(chamado)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="action" 
                                                        // onClick={()=> navigate(`edit-chamado/${chamado.id}`)}
                                                        style={{ backgroundColor: '#f63535' }}
                                                        title='Desativar/Ativar'
                                                    >
                                                        <BiBlock/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td data-label="index">3</td>

                                            <td data-label="Projeto">Champions League</td>

                                            <td data-label="Status">
                                                <span 
                                                className="badge" 
                                                style={{backgroundColor: '#5cb85c'}}
                                                // style={{backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : chamado.status === 'Atendido' ? '#999' : '#1a449e' }}
                                                >
                                                Ativo
                                                </span>
                                            </td>

                                            <td data-label="Ações">
                                                <div className="actions">
                                                    <button 
                                                        className="action" 
                                                        style={{ backgroundColor: '#3583f6' }}
                                                        // onClick={()=> callModal(chamado)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="action" 
                                                        // onClick={()=> navigate(`edit-chamado/${chamado.id}`)}
                                                        style={{ backgroundColor: '#f63535' }}
                                                        title='Desativar/Ativar'
                                                    >
                                                        <BiBlock/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td data-label="index">4</td>

                                            <td data-label="Projeto">Copa Feminina Visa</td>

                                            <td data-label="Status">
                                                <span 
                                                className="badge" 
                                                style={{backgroundColor: '#5cb85c'}}
                                                // style={{backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : chamado.status === 'Atendido' ? '#999' : '#1a449e' }}
                                                >
                                                Ativo
                                                </span>
                                            </td>

                                            <td data-label="Ações">
                                                <div className="actions">
                                                    <button 
                                                        className="action" 
                                                        style={{ backgroundColor: '#3583f6' }}
                                                        // onClick={()=> callModal(chamado)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="action" 
                                                        // onClick={()=> navigate(`edit-chamado/${chamado.id}`)}
                                                        style={{ backgroundColor: '#f63535' }}
                                                        title='Desativar/Ativar'
                                                    >
                                                        <BiBlock/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                                )}
                            </div>

                            </>
                        )}
                    </div>

                </div>
            </main> 

            {/* {modalIsOpen && <ModalMedia
                                closeModal={()=> setModalIsOpen(false)}
                                action='add'
                                // title='Adicionando mídia'
                                midiaEdit={midiaSelecionada}
            />} */}

        </div>
    );
}