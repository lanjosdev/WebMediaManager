// Funcionalidades / Libs:
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Contexts:
import { UserContext } from '../contexts/userContext';

// Estilo:
import './privateRoute.scss';


export default function PrivateRoute({ children }) {
    const { loadingRoute, logado } = useContext(UserContext);

    return (
        <>
        {loadingRoute ? (
            <div className='title-loading'>
                <h1>Direcionando rota...</h1>
            </div>
        ) : (
            logado ? (
                children
            ) : (
                <Navigate to='/' />
            )
        )}
        </>
    )
}

PrivateRoute.propTypes = {
    children: PropTypes.array.isRequired,
}