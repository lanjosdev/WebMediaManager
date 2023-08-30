// Funcionalidades / Libs:
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Contexts:
import { AuthContext } from '../contexts/authContext';

// Estilo:


export default function PrivateRoute({ children }) {
    const { logado, loading } = useContext(AuthContext);

    return (
        <>
        {loading ? (
            <h1 className='title-loading'>Carregando...</h1>
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