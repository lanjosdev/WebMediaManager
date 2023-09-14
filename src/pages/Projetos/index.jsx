// Funcionalidades / Libs:
import { useState, useContext, useEffect } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from '../../components/Header';
// import { ModalMedia } from "../../components/Modal/ModalMedia/modalMedia";

// Assets:
import { BiSolidSpreadsheet } from 'react-icons/bi';

// Estilo:
import './projetos.scss';


export default function Projetos() {
    const {
        userDetails, 
        logoutUser, 
    } = useContext(UserContext);


    return (
        <div className='Container'>

            <Header userLevel={userDetails.loglevel} logout={logoutUser} />

            <main className="page-content">
                <div className="grid">

                    <h1><BiSolidSpreadsheet/> <span>Projetos</span></h1>
                    <p>
                        Abaixo você pode visualizar, adicionar e editar projetos cadastrados.
                    </p>

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