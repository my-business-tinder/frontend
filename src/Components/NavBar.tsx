import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { ReactComponent as MyProfile } from '../Svg/MyProfile.svg';
import { ReactComponent as SimilarInterests } from '../Svg/SimilarInterests.svg';
import { ReactComponent as MeetNewPeople} from '../Svg/MeetNewPeople.svg';
import { ReactComponent as Chats } from '../Svg/Chats.svg';
import '../StyleSheets/footer.css'

export default function NavBar() {
    const location = useLocation();

    const isActivePage = (pathname: string) => {
        return location.pathname === pathname;
    };

    return (
        <footer className="footer_main">
            <div>
                <Link to="/my-account">
                    <MyProfile
                        className={`icon_size ${isActivePage('/my-account') ||
                        isActivePage('/my-account/interests') ||
                        isActivePage('/my-account/changes')?
                            'active_icon': ''}`}
                    />
                </Link>
            </div>
            <div>
                <Link to="/similar-interests">
                    <SimilarInterests
                        className={`icon_size ${isActivePage('/similar-interests') ? 'active_icon': ''}`}
                    />
                </Link>
            </div>
            <div>
                <Link to="/new-people">
                    <MeetNewPeople
                        className={`icon_size ${isActivePage('/new-people') ? 'active_icon': ''}`}
                    />
                </Link>
            </div>
            <div>
                <Link to="/chats">
                    <Chats
                        className={`icon_size ${isActivePage('/chats') ? 'active_icon': ''}`}
                    />
                </Link>
            </div>
        </footer>
    );
}

