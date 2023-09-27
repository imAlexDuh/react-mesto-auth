import React from 'react';
import succesSign from '../images/succes-sign-up.svg';
import errorSign from '../images/error-sign-up.svg';

const InfoTooltip = ({ isOpen, onClose, isSucces }) => {
    return (
        <div
            className={`popup ${isOpen ? 'popup_opened' : ''}`}
        >
            <div
                isOpen={isOpen}
                className="popup__container_sign"
                onRequestClose={onClose}
            >
                <img
                    className="popup__icon"
                    src={isSucces ? succesSign : errorSign}
                    alt={isSucces ? "успешно" : "ошибка"}
                />

                <h2
                    className="popup__title"
                >
                    {isSucces ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз'}
                </h2>

                <button type="button" className='popup__close-button' onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;