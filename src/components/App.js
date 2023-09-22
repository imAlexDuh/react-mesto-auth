import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js'

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isImgPopupOpen, setIsImgPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCardsData] = React.useState([]);

    React.useEffect(() => {
        api.getCardsInfo()
            .then((data) => {
                setCardsData(data);
            })

            .catch((err) => {
                console.log(err);
            })

    }, [])

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })

            .catch((err) => {
                console.log(err);
            })

    }, [])

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setIsImgPopupOpen(false);
    }

    function handleCardClick(card) {
        setIsImgPopupOpen(true);
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCardsData((state) => state.map((c) => c._id === card._id ? newCard : c));
            })

            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCardsData((state) => state.filter((elem) => elem._id !== card._id));
            })

            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })

            .catch((err) => {
                console.log(err);
            })

    }

    function handleUpdateAvatar(data) {
        api.setUserAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })

            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((newCard) => {
                setCardsData([newCard, ...cards]);
                closeAllPopups();
            })

            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
            <Footer />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser} />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit} />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />

            <ImagePopup
                card={selectedCard}
                isOpen={isImgPopupOpen}
                onClose={closeAllPopups}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
