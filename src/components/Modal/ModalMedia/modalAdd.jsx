// Funcionalidades / Libs:
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
// import Cookies from "js-cookie";

// import { MEDIA_ADD, MEDIA_GET_ALL } from "../API/mediaApi";

// Assets:
import thumbPreview from '../../../assets/thumbModal.jpg';
import { FiX, FiCheckCircle, FiUpload } from 'react-icons/fi';

// Estilo:
import './modal.scss';


export function ModalAdd({ closeModal, action, title, updateSequence }) {
    const [fileMedia, setFileMedia] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    const [emptyFile, setEmpetyFile] = useState(false);
    const [loading, setLoading] = useState(false);

    // const token = Cookies.get('token');

    function onChangeFile(e) {
        if(e.target.files[0]) {
            const file = e.target.files[0];

            if((file.type === 'video/mp4' || file.type === 'image/png' || file.type === 'image/jpeg') && (file.size <= 10000000)) {
                setFileMedia(file);
                setFileUrl(URL.createObjectURL(file)); 
                setEmpetyFile(false);
                console.log('ARQUIVO OK');                                               
            } else {
                if(file.size > 10000000) {
                    toast.error('Arquivo muito grande! No máximo de 10MB');
                } else {
                    toast.warn('Arquivo não aceito');
                }            
                setFileMedia(null);
                setFileUrl(null);
                setEmpetyFile(true);
                console.log('NÃOOOO');  
                return;
            }
        } 
        // else {
        //     // setFileMedia(null);
        //     // setFileUrl(null);
        //     console.log(fileMedia);
        // }
        console.log(fileMedia);
    }

    async function handleAddMedia(e) {
        e.preventDefault();

        if(fileMedia === null) {
            !emptyFile && toast.warn('Selecione um arquivo antes de enviar!');
            setEmpetyFile(true);
            return;
        }

        setLoading(true);

        if(fileMedia.size > 10000000) {
            toast.error('Arquivo muito grande! No máximo de 10MB');
        } 
        else 
        {
            const formData = new FormData();
            formData.append('file', fileMedia);
            
            let mediaType = 0;
            if(fileMedia.type === "video/mp4") {
                mediaType = 2;
            } else {
                mediaType = 1;
            }
            formData.append('mediaType', mediaType);

            // console.log(fileMedia.type);
            console.log('ENVIOU');
        }
         
        setLoading(false);
    }

    return (
        <div className="Modal-container">

        <div className="modal-background" onClick={closeModal}></div>

        <form className="modal-window" onSubmit={handleAddMedia}>
            <a className='btn-close' onClick={closeModal} title="Fechar"><FiX/></a>
            
            <h2>{title}</h2>

            <div className="modal-content">
                <div className="preview">
                    <h3>Preview:</h3>

                    {/* ou se tem midia ai executa modal edit */}
                    {action === 'edit' ? (
                        <>
                        {action === 1 ? (
                            <img src={"https://samsungflip.bizsys.com.br/storage/"} alt="" />
                        ) : (
                            <video controls>
                                <source src={"https://samsungflip.bizsys.com.br/storage/"} type="video/mp4" />
                            </video>
                        )} 
                        </>    
                    ) : (
                        !fileUrl ? (
                            <div className="sem-arquivo"><span>Nenhum arquivo selecionado!</span></div>
                        ) : (
                            fileMedia.type === 'video/mp4' ? (
                                <video controls>
                                    <source src={fileUrl} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={fileUrl}
                                    alt="Thumb ilustrativa"
                                />
                            )                             
                        )                       
                    )}
                </div>

                <div className='info-midia'>
                    {/* <div className="file"> */}
                    <h3>Informações do arquivo selecionado:</h3>

                    {/* daqui condicional de carrega div tal ou outra */}
                    <div className="add-midia">
                    <div className="choice-file">
                        <label>Arquivo: </label>

                        <label className="input-file">
                            <a className="btn-file">
                                Escolher arquivo
                            </a>
                            <input
                                type="file"
                                // name="media"
                                accept='image/png, image/jpeg, video/mp4'
                                onChange={onChangeFile}
                                // style={{color: !fileMedia && 'red'}}
                            />
                        </label>
                        {/* {hasFile ? ( */}
                            {/* // em mobile deixe display inline-block + marginleft */}
                        <small className="resul">
                            {emptyFile ? 
                            <b style={{color: 'red', paddingTop: '30px'}}>Nada selecionado</b> 
                            :
                            fileMedia &&
                            <b style={{color: 'green'}}><FiCheckCircle/> Basta clicar em “Salvar”</b>}
                        </small>
                        {/* // ) : (fileMedia && )} */}
                        <br />
                        <small>
                            <em>Arquivos aceitos: imagem(<b>.jpg, .png</b>) e vídeo(<b>.mp4</b>).</em>
                        </small>
                    </div>

                    <div className="info-file">
                        <p>Mídia selecionda: <span>{fileMedia && fileMedia.name}</span></p> {/* Mandar na API o nome dentro no objeto */}
                        <p>Tipo da mídia: {fileMedia && <span>{fileMedia.type === 'video/mp4' ? 'Vídeo' : 'Imagem'} (<b>{fileMedia.name.slice(-4)}</b>)</span>} </p>
                        <p>Tamanho: <span>{fileMedia && fileMedia.size + " bytes"}</span></p>
                    </div>
                    </div>
                </div>                  
            </div>

            <div className="actions-btn">
                <a className='btn-cancel' onClick={closeModal}>Cancelar</a>
                <button type='submit' className='btn-upload' disabled={emptyFile}>{loading ? 'Carregando...' : 'Salvar'}</button>
                {/* btn delete com condicional para editmodal */}
            </div>

        </form>
        
        </div>
    );
}

ModalAdd.propTypes = {
    closeModal: PropTypes.func.isRequired,
    updateSequence: PropTypes.func.isRequired
}
