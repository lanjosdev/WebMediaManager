// Funcionalidades / Libs:
import { useState, useContext, useEffect } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from '../../components/Header';
// import { ModalMedia } from "../../components/Modal/ModalMedia/modalMedia";

// Assets:
import { FaUsers } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { BiBlock } from 'react-icons/bi';


// Estilo:
import './usuarios.scss';


export default function Usuarios() {
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    const {
        userDetails, 
        buscaUsersAll,
        logoutUser, 
    } = useContext(UserContext);


    useEffect(()=> {
        function carregaUsuarios() {
            let res = [];

            setTimeout(()=> {

            res = buscaUsersAll();

            if(res.length === 0) {
                console.log('NENHUM USUARIO ENCONTRADO!');
                return;
            }

            setUsuarios(res);
            setLoadingUsers(false);

            }, 700)
        }
        carregaUsuarios();
    }, [buscaUsersAll]);


    return (
        <div className='Container'>

            <Header userLevel={userDetails.loglevel} logout={logoutUser} />

            <main className="page-content">
                <div className="grid">

                    <h1 className="title"><FaUsers/> <span>Usuários</span></h1>
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
                                        Nenhum usuário foi adicionado!
                                    </p>
                                    <button className="add-user" onClick=''>
                                        + Novo Usuário
                                    </button>
                                </div>

                                ) : (

                                <table className="table-users">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Usuário</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Perfil</th>
                                            <th scope="col">Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {usuarios.map((usuario, idx)=> (
                                            <tr key={usuario.id}>
                                                <td data-label="index">{idx + 1}</td>

                                                <td data-label="Usuario">{usuario.name}</td>

                                                <td data-label="Status">
                                                    <span 
                                                    className="badge" 
                                                    // style={{backgroundColor: '#5cb85c'}}
                                                    style={{backgroundColor: usuario.status ? '#5cb85c' : '#999' }}
                                                    >
                                                        {usuario.status ? 'Ativo' : 'Inativo'}
                                                    </span>
                                                </td>

                                                <td data-label="Perfil">
                                                    {usuario.loglevel === 1 ? 'Operador': 'SuperAdmin'}
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
                                        ))}
                                        
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