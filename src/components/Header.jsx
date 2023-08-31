// Funcionalidades / Libs:
// import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// // Assets:
import Logo from '../assets/LOGO-BIZSYS_preto.png';
import LogoP from '../assets/BIZSYS_logo_icon.png';
import { TbLogout } from 'react-icons/tb';

// Estilo:
import './header.scss';


export function Header({ userLevel }) {

    return (
        <header className="Header-container">
            <div className="grid">

                <Link to='/home'>
                    <img src={Logo} alt="Logotipo" />
                    <img src={LogoP} className="imgP" alt="Logotipo" />
                </Link>

                {userLevel === 100 && 
                <nav>
                    <ul>
                        <li>
                            <NavLink to='/home'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/projetos'>Projetos</NavLink>
                        </li>
                        <li>
                            <NavLink to='/usuarios'>Usuários</NavLink>
                        </li>
                    </ul>
                </nav>}                

                <button className='btn-logout' onClick="">
                    <span>Sair</span><TbLogout/>
                </button>

            </div>
        </header>
    )
}