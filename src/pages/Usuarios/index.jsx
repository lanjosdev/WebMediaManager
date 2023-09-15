// Funcionalidades / Libs:
import { useState, useContext, useEffect } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from '../../components/Header';
// import { ModalMedia } from "../../components/Modal/ModalMedia/modalMedia";

// Assets:
import { FaUsers } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi'

// Estilo:
import './usuarios.scss';


export default function Usuarios() {
    const [loadingUsers, setLoadingUsers] = useState(false); ///////////////
    const [usuarios, setUsuarios] = useState([]);

    const {
        userDetails, 
        logoutUser, 
    } = useContext(UserContext);


    return (
        <div className='Container'>

            <Header userLevel={userDetails.loglevel} logout={logoutUser} />

            <main className="page-content">
                <div className="grid">

                    <h1><FaUsers/> <span>Usuários</span></h1>
                    <p>
                        Abaixo você pode visualizar, adicionar e editar usuários do ambiente.
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
                        {loadingUsers ? (

                            <p className="loading-usuarios">
                                <strong>Carregando Usuários...</strong>
                            </p>

                        ) : (
                            <>

                            <div className='cabecalho-painel'>
                                <h2>Usuários Cadastrados</h2>
                                
                                {usuarios.length !== 0 && 
                                <button className="add-user" onClick=''>Novo Usuário</button>}
                            </div>

                            <div className="content-painel">
                                {usuarios.length === 0 ? (

                                <div className="not-users">
                                    <p>
                                        Nenhum usuários foi adicionado!
                                    </p>
                                    <button className="add-user" onClick=''>
                                        + Novo Usuário
                                    </button>
                                </div>

                                ) : (

                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Assunto</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Cadastrado em</th>
                                            <th scope="col">Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {/* map aqui */}
                                        <tr>
                                            <td data-label="Cliente">Seila</td>

                                            <td data-label="Assunto">Seila</td>

                                            <td data-label="Status">
                                                <span 
                                                className="badge" 
                                                style={{backgroundColor: '#5cb85c'}}
                                                // style={{backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : chamado.status === 'Atendido' ? '#999' : '#1a449e' }}
                                                >
                                                Ativo
                                                </span>
                                            </td>

                                            <td data-label="Cadastrado em">
                                                10/10/10
                                            </td>

                                            <td data-label="Ações">
                                                <div className="actions">
                                                    <button 
                                                        className="action" 
                                                        style={{ backgroundColor: '#3583f6' }}
                                                        // onClick={()=> callModal(chamado)}
                                                    >
                                                        @
                                                    </button>
                                                    <button 
                                                        className="action" 
                                                        // onClick={()=> navigate(`edit-chamado/${chamado.id}`)}
                                                        style={{ backgroundColor: '#f6a935' }}
                                                    >
                                                        @
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* map fim */}

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