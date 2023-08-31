// Funcionalidades / Libs:
import { useState, useRef, useContext } from "react";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Assets:
import Logo from '../../assets/LOGO-BIZSYS_preto.png';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

// Estilo:
import './login.scss';


export default function Login() {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const [showSenha, setShowSenha] = useState(false);

  const {
    logarUser,
    loadingAuth
  } = useContext(UserContext);

//Usar um useEffect que se tiver logado direcione para page home (chamar função no context)

  async function handleSubmitLogin(e) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(email !== '' && password !== '') {
      await logarUser(email, password)
    }        
  } 
  
  return (
    <main className='Login-container'>
      <div className="grid fadeIn">

        <h1> <img src={Logo} alt="Logotipo" /> </h1>
        <p>Faça seu login no ambiente</p>

        <form onSubmit={handleSubmitLogin} autoComplete="off">
          <div className="input-div">
              <AiOutlineUser/>
              <input
                type="email"
                placeholder='Usuário'
                ref={emailRef}
                required
              />
          </div>

          <div className="input-div">
              <AiOutlineLock/>
              <input
                type={showSenha ? 'text' : 'password'}
                placeholder='Senha'
                ref={passwordRef}
              //   value={password}
              //   onChange={(e)=> setPassword(e.target.value)}
                required
              />
          </div>

          <div className="show-senha">
            <input
              type="checkbox"
              id='showSenha'
              onClick={()=> setShowSenha(!showSenha)}
            />
            <label htmlFor="showSenha">Mostrar senha</label>
          </div>

          <button type='submit'>{loadingAuth ? 'Verificando...' : 'Entrar'}</button>
        </form>

      </div>  

      <footer>
          <p>&copy;2023 Bizsys</p>
      </footer>
    </main>
  );
}
