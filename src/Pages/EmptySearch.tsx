import React from 'react';
import '../StyleSheets/emptySearch.css'
import { ReactComponent as Magnifier } from '../Svg/Magnifier.svg';
import  { ReactComponent as Grasshopper} from '../Svg/Grasshopper.svg';
import '../StyleSheets/text_styles.css'
import {useLocation} from "react-router-dom";

const EmptySearch = () => {

    const locationHeader = useLocation();

    let firstText: string = "";
    let secondText: string = ""
    let thirdText: string[] = [];

    if (locationHeader.pathname === "/cards") {
        firstText = "Карточки с интересами закончились";
        secondText = "Но не беда!"
        //thirdText = ["Вы можете добавить свои или подождать,", "пока это сделает кто-то другой"];
    }

    else if (locationHeader.pathname === "/new-people") {
        firstText = "Похоже сегодня пусто...";
        secondText = "Но не беда!"
        //thirdText = ["Сделайте описание профиля поподробнее", "и проявляйте инициативу сами",
            //"Тогда точно кто-нибудь тут появится!"];
    }

    else if (locationHeader.pathname === "/chats") {
        secondText = "Похоже, тут пусто..."
    }

    else if (locationHeader.pathname === "/hiddenUsers") {
        secondText = "Похоже, тут пусто..."
    }

    else if (locationHeader.pathname === "/similar-interests") {
        firstText = "Похоже сегодня пусто...";
        secondText = "Но не беда!"
    }

    return (
        <main className='empty_search'>
            <div className='empty_text'>{firstText}</div>
            <div className='outer_container'>
                <Magnifier className='magnifier'/>
                <Grasshopper className='inner_image'/>
            </div>
            <div className='empty_text'>{secondText}</div>
            <div className='empty_text'>
                {thirdText.map((line, index) => (
                    <div key={index}>
                        {line}
                        <br/>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default EmptySearch;