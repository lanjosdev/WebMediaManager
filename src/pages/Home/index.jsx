// Funcionalidades / Libs:
import { useState, useContext } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from "../../components/Header";

// Assets:

// Estilo:
import './home.scss';


export default function Home() {
    const {userDetails} = useContext(UserContext);
    console.log(userDetails);
//   const emailRef = useRef('');
//   const passwordRef = useRef('');

//   const [showSenha, setShowSenha] = useState(false);


    return (
        <div className='Container'>

            <Header 
            // userLevel={userDetails.loglevel}
            />

            <main className="page-content">
                <div className="grid">

                    <h1>Bem-vindo(a) {userDetails.name}</h1>
                    <p>Abaixo você pode visualizar, adicionar e editar as mídias de acordo com o projeto selecionado.</p>

                    <div className="select-project">
                        <label htmlFor="projeto">Projeto selecionado:</label>
                        <select name="" id="projeto">
                            <option value="">Selecione...</option>
                        </select>
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