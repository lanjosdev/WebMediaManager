// Funcionalidades / Libs:
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Contexts:
import { UserContext } from '../contexts/userContext';

// Estilo:
import './privateRoute.scss';


export default function PrivateRoute({ path, element }) {
    const { loadingRoute, logado, userDetails } = useContext(UserContext);

    // if (logado === true) return <Route {...props}></Route>;
    // else if (logado === false) return <Navigate to="/" />;
    // else return null;
    return (
        <>
        {loadingRoute ? (
            <div className='title-loading'>
                <h1>Direcionando rota...</h1>
            </div>
        ) : (
            logado ? (

                path === '/home' ? (
                    element
                ) : (
                    userDetails.loglevel === 100 ? (
                        element
                    ) : (
                        <Navigate to='/home' />
                    )
                )
                                
            ) : (
                <Navigate to='/' />
            )
        )}
        </>
    )
}

PrivateRoute.propTypes = {
    // children: PropTypes.array.isRequired,
    element: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
}