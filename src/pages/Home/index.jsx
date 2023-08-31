// Funcionalidades / Libs:
import { useState, useRef, useContext } from "react";
// import Cookies from "js-cookie";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Components:
import { Header } from "../../components/Header";

// Assets:
// import Logo from '../../assets/LOGO-BIZSYS_preto.png';

// Estilo:
import './home.scss';


export default function Home() {
//   const emailRef = useRef('');
//   const passwordRef = useRef('');

//   const [showSenha, setShowSenha] = useState(false);

  // const [loadingAuth, setLoadingAuth] = useState(false); //temporario chamr no context
  const {
    userDetails
  } = useContext(UserContext);

  console.log(userDetails);

  return (
    <div className='Container'>

        <Header userLevel={userDetails.loglevel} />

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