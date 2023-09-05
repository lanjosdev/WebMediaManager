// Funcionalidades / Libs:
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

// import { MEDIA_ADD, MEDIA_GET_ALL } from "../API/mediaApi";

// Assets:
import { FiX, FiUpload } from 'react-icons/fi';

// Estilo:
import './modal.scss';


export function ModalAdd({ closeModal, updateSequence }) {
    const [fileMedia, setFileMedia] = useState();
    const [loading, setLoading] = useState(false);

    const token = Cookies.get('token');


    async function handleAddMedia(e) {
        e.preventDefault();

        if(fileMedia.type === "video/mp4" || fileMedia.type === "image/jpeg" || fileMedia.type === "image/png") {
            setLoading(true);

            if(fileMedia.size > 10000000) {
                toast.error('Arquivo muito grande ! No máximo de 10MB');
            } else {
                const formData = new FormData();
                formData.append('file', fileMedia);
                
                let mediaType = 0;
                if(fileMedia.type === "video/mp4") {
                    mediaType = 2;
                } else {
                    mediaType = 1;
                }
                formData.append('mediaType', mediaType);
    
                console.log(fileMedia.type);
        
                await MEDIA_ADD(formData, token)
                .then(()=> {
                    toast.success('Upload realizado com sucesso!');
                    console.log('chama all medias:')
                    MEDIA_GET_ALL(token)
        
                    updateSequence();
                    closeModal(false);
                })
                .catch((error)=> {
                    console.log('ERRO AO ADD MIDIA:');
                    console.log(error);
                }) 
            }
        } else {
            toast.error('Arquivo não aceito!');
        }
        
        setLoading(false);
    }

    return (
        <div className="modal-background">

            <form className="modal-container" onSubmit={handleAddMedia}>
                <a className='btn-close' onClick={() => closeModal(false)}>X</a>
                
                <h2>Adicionando mídia</h2>

                <div className="config-midia">
                    {/* <img src={Thumb} alt="Thumbmail da mídia"/> */}

                    <div className='info-midia'>
                        <div className="file">
                            <h3>Informações do arquivo selecionado:</h3>

                            <div className="select-file">
                                <label>Arquivo: </label>
                                <input
                                    type="file"
                                    name="media"
                                    onChange={(e)=> setFileMedia(e.target.files[0])}
                                    style={{color: !fileMedia && 'red'}}
                                    required
                                />
                                <br />
                                <small><em>Arquivos aceitos: imagem(<b>.jpg, .png</b>) e vídeo(<b>.mp4</b>)</em></small>

                                {fileMedia && (
                                    <>
                                        <br />
                                        <small className="resul">
                                            <b>Tudo certo para adicionar a mídia! Basta clicar em “Salvar”</b>
                                        </small>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="edit-name">
                            <p>Mídia selecionda: <span>{fileMedia && fileMedia.name}</span></p>

                            <p>Tamanho: <span>{fileMedia && fileMedia.size + " bytes"}</span></p>

                            {/* <input 
                                type="text" 
                                id="editMidia" 
                                placeholder='Nome que irá aparecer na lista'
                                value={nameMedia}
                                onChange={(e)=> setNameMedia(e.target.value)}
                                required
                                autoComplete='off'
                            /> */}
                        </div>
                    </div>                  
                </div>

                <div className="actions-btn">
                    <a className='btn-cancel' onClick={() => closeModal(false)}>Cancelar</a>
                    <button type='submit' className='btn-upload'>{loading ? 'Carregando...' : 'Salvar'}</button>
                </div>
            </form>

        </div>
    );
}

ModalAdd.propTypes = {
    closeModal: PropTypes.func.isRequired,
    updateSequence: PropTypes.func.isRequired
}
