import React, {ForwardedRef, forwardRef, useEffect, useRef, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as AddInterests} from '../Svg/addInterests.svg';
import { ReactComponent as NewMenu } from '../Svg/newMenu.svg';
import { ReactComponent as Settings } from '../Svg/Settings.svg';

export interface HeaderProps {}

export const useHeaderRef = () => {
    const headerRef = useRef<HTMLHeadingElement | null>(null);
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    useEffect(() => {
        const updateHeight = () => {
            const height = headerRef.current?.offsetHeight;
            if (height) {
                setHeaderHeight(height);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return { headerRef, headerHeight };
};

export const Header = forwardRef<HTMLHeadingElement, HeaderProps>((props,
                                                                   ref: ForwardedRef<HTMLHeadingElement>) => {

    const locationHeader = useLocation();

    let boldHeaderText = "";
    let thinHeaderText = "";
    let headerImage = null;

    const [showHiddenUsers, setShowHiddenUsers] = useState(false);
    const handleImageClick = () => {
        setShowHiddenUsers(!showHiddenUsers);
    };

    if (locationHeader.pathname === "/similar-interests") {
        boldHeaderText = "Люди со схожими интересами";
        thinHeaderText = "Ежедневная подборка";
    }
    else if (locationHeader.pathname === "/new-people") {
        boldHeaderText = "Желающие с вами познакомиться";
        thinHeaderText = "Похоже, вы чем-то их заинтересовали"
        /*headerImage = (
            <div onClick={handleImageClick}>
                <NewMenu
                    className="header_back_image"
                />
                <Link to='/hiddenUsers'>
                    {showHiddenUsers && <div className="hidden_users">Скрытые пользователи</div>}
                </Link>
            </div>
        );*/
    }
    else if (locationHeader.pathname === "/my-account/interests") {
        boldHeaderText = "Ваши интересы"
        thinHeaderText = "Тут вы можете их настроить или добавить новые"
        /*headerImage = <AddInterests
            className="header_back_image"
        />*/
    }

    else if (locationHeader.pathname === '/chats') {
        boldHeaderText = "Переписки!!!"
        thinHeaderText = "С кем вы смэтчились"
        /*headerImage = (
            <div onClick={handleImageClick}>
                <NewMenu
                    className="header_back_image"
                />
                <Link to='/hiddenUsers'>
                    {showHiddenUsers && <div className="hidden_users">Скрытые пользователи</div>}
                </Link>
            </div>
        );*/
    }

    else if (locationHeader.pathname === '/my-account') {
        boldHeaderText = "Ваш профиль"
        /*headerImage = <Link to="/my-account/changes">
            <Settings
                className="header_back_image"
            />
        </Link>*/
    }

    return (
        <header className="header_back" ref={ref}>
            <div className="header_text">
                <div className="header_bold">
                    {boldHeaderText}
                </div>
                <div className="header_thin">
                    {thinHeaderText}
                </div>
            </div>
            <div className="back_container">
                {headerImage}
            </div>
        </header>
    );
});
