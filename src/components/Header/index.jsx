// Funcionalidades / Libs:
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
// import PropTypes from "prop-types";

import { UserContext } from "../../contexts/userContext";

// // Assets:
import Logo from '../../assets/LOGO-BIZSYS_preto.png';
import LogoP from '../../assets/BIZSYS_logo_icon.png';
import { TbLogout } from 'react-icons/tb';
import { MdClose, MdMenu } from 'react-icons/md';


// Estilo:
import './header.scss';


export function Header() {
    const {
        userDetails, 
        logoutUser, 
    } = useContext(UserContext);

    function closeSidbar() {
        let bgSidebar = document.querySelector(".side-background").style;
        let sidebar = document.querySelector(".sidebar").style;
        bgSidebar.display = 'none';
        sidebar.display = 'none';
    }
    
    function openSidebar() {
        let bgSidebar = document.querySelector(".side-background").style;
        let sidebar = document.querySelector(".sidebar").style;
        bgSidebar.display = 'block';
        sidebar.display = 'block';
    }

    function handleClickLogout() {
        logoutUser();
    }

    return (
        <>
        <header className="Header-container shadow-md">
            <div className="grid">

                <Link to='/home'>
                    <img src={Logo} alt="Logotipo" />
                    <img src={LogoP} className="imgP" alt="Logotipo" />
                </Link>

                {userDetails.loglevel === 100 && 
                <nav className="menu-desktop">
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

                <button 
                className={userDetails.loglevel === 100 ? 'btn-logout adm' : 'btn-logout'} 
                onClick={handleClickLogout}
                >
                    <span>Sair</span><TbLogout/>
                </button>

                {userDetails.loglevel === 100 &&
                <button 
                className="btn-menu"
                onClick={openSidebar}
                >
                    <MdMenu size={25}/>
                </button>
                }

            </div>
        </header>


        {userDetails.loglevel === 100 && 
        <>
        <div className="side-background" onClick={closeSidbar}></div>
        <aside className="sidebar showSidebar">
            <button 
            className="btn-closeside"
            onClick={closeSidbar}
            >
                <MdClose size={25}/>
            </button>

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
            </nav>

            <button 
            className='btn-logout'
            onClick={handleClickLogout}
            >
                <span>Sair</span><TbLogout/>
            </button>
        </aside>
        </>        
        }
        
        </>
    )
}