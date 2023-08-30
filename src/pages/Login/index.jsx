// Funcionalidades / Libs:
import { useState, useRef, useContext } from "react";
// import { useNavigate } from 'react-router-dom';
// import Cookies from "js-cookie";

// Contexts:
import { UserContext } from "../../contexts/userContext";

// Assets:
import Logo from '../../assets/LOGO-BIZSYS_preto.png';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

// Estilo:
import './login.scss';



export default function Login() {
    const userRef = useRef('');
    const passwordRef = useRef('');

    const [showSenha, setShowSenha] = useState(false);

    const [loadingAuth, setLoadingAuth] = useState(false); //temporario
    // const navigate = useNavigate();

    // Values context:
    // const { 
    //     authLogin,
    //     loadingAuth
    // } = useContext(AuthContext);

    // useEffect(()=> {
    //   async function checkToken() {
    //     let t = Cookies.get('token');
    //     if(t){
    //         let result_token = await CHECK_TOKEN(t);
    //         if(result_token === true)
    //             navigate('/home');
    //         else
    //         {
    //             Cookies.remove('token');
    //             navigate('/');
    //         }
    //     }
    //   }
    //   checkToken();
    // }, [navigate]);

    async function handleSubmitLogin(e) {
        e.preventDefault();

        const user = userRef.current?.value;
        const password = passwordRef.current?.value;

        if(user !== '' && password !== '') {
            alert('Logou!')
            // await authLogin(email, password) chama do context
        }        
    } 
  
    return (
      <main className='Login-container'>
        <div className="grid">
  
          <h1> <img src={Logo} alt="Logotipo" /> </h1>
          <p>Faça seu login no ambiente</p>
  
          <form onSubmit={handleSubmitLogin} autoComplete="off">
            <div className="input-div">
                <AiOutlineUser/>
                <input
                  type="text"
                  placeholder='Usuário'
                  ref={userRef}
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
