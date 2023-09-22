import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id="img-popup">
            <div className="popup__img">
                <img alt={props.card.name} src={props.card.link} className="popup__image" />
                <p className="popup__image-name">{props.card.name}</p>
                <button onClick={props.onClose} type="button" id='img-popup__close-button' className="popup__close-button"></button>
            </div>
        </div>
    )
}



export default ImagePopup;