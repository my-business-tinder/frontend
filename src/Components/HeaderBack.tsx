import React, {ForwardedRef, forwardRef} from 'react';
import { ReactComponent as Back} from '../Svg/back.svg';
import addInterests from '../Svg/addInterests.svg'
import '../StyleSheets/header.css'
import '../StyleSheets/interests.css'
import '../StyleSheets/similiarInterests.css'
import '../StyleSheets/text_styles.css'
import '../StyleSheets/styles.css'
import {Link, useLocation, useParams} from "react-router-dom";
import meet_new_people from "../Svg/MeetNewPeople.svg";
import notSeen from "../Svg/NotSeen.svg";
import chats from "../Svg/Chats.svg";
import {HeaderProps} from "../Components/Header";

const HeaderBack = forwardRef<HTMLHeadingElement, HeaderProps>((props,
                                                                ref: ForwardedRef<HTMLHeadingElement>) => {

    const locationHeader = useLocation();
    const { id } = useParams();

    let backToPage = "";
    let headerText = "";
    let headerImage = null;

    if (locationHeader.pathname === '/my-account/interests') {
        backToPage = '/my-account';
        headerText = "Ваши интересы";
        headerImage = <img className="header_back_image" src={addInterests}></img>;
    }

    else if (locationHeader.pathname === '/my-account/changes') {
        backToPage = '/my-account';
        headerText = "Редактирование профиля"
    }

    else if (locationHeader.pathname === '/similar-interests') {
        backToPage = '/similar-interests'
        headerImage = <div className='svg_container_header'>
            <img className='not_seen' src={meet_new_people}></img>
            <img className='not_seen' src={notSeen}></img>
            <img className='not_seen' src={chats}></img>
        </div>
    }

    else if (locationHeader.pathname ==='/my-account/changes/contacts') {
        backToPage = '/my-account/changes'
        headerText = 'Соцсети и контакты'
    }

    else if (locationHeader.pathname === '/cards') {
        backToPage = '/my-account/interests'
        //headerImage = <img className="header_back_image" src={addInterests}></img>
    }

    else if (locationHeader.pathname === '/hiddenUsers') {
        backToPage = '/chats'
        headerText = "Скрытые пользователи"
    }

    if (`/other-profile/${id}` === locationHeader.pathname) {
        backToPage = '/similar-interests';
        //headerText = "Some Header Text";
    }

    return (
        <header className="header_back" ref={ref}>
            {/*<div className="back_container">
                <Link to={backToPage}>
                    <Back
                        className="header_back_image"
                    />
                </Link>
            </div>*/}
            <div className="header_back_text">
                <div className="header_bold">{headerText}</div>
            </div>
            <div className="back_container">
                {headerImage}
            </div>
        </header>
    );
});

export default HeaderBack;