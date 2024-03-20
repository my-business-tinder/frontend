import React, {useEffect, useState} from 'react';
import NavBar from '../Components/NavBar'
import {Header} from '../Components/Header'
import '../StyleSheets/text_styles.css'
import '../StyleSheets/styles.css'
import '../StyleSheets/all_pages.css'
import '../StyleSheets/animation.css'
import '../StyleSheets/index.css'
//import {Person} from '../Components/Person';
import { ReactComponent as SmallChats } from '../Svg/smallChats.svg';
import cat from '../Png/cat.png'
//import {useSwipeable} from 'react-swipeable';
import EmptySearch from "../Pages/EmptySearch";
import { useNavigate } from 'react-router';
import { OtherUser } from '../api/types';
import { getPotentialUsers, getUserInterests } from '../api/api';

interface InterestsRectangleProps {
    person: OtherUser;
    // removeChat: (personId: string) => void;
}

const InterestsRectangle: React.FC<InterestsRectangleProps> = ({ person }) => {
    return (
        <div className="interests_rectangle" style={{ position: 'relative' }}>
            <div className="menu">
                <img src={person.photo_url ?? cat} alt='аватарка'></img>
            </div>
            <div className="interests_text">
                <div>{`${person.first_name} ${person.last_name}`}</div>
                <a href={`https://t.me/${person.username}`} target="_blank" rel="noopener noreferrer">
                    {`${person.username}`}
                </a>
            </div>
            <div className="menu">
                <SmallChats className="menu_svg"/>
            </div>
        </div>
    );
};

const Chats: React.FC = () => {
    const navigate = useNavigate();
    const [persons, setPersons] = useState<OtherUser[]>([]);
    const [isLoading, setLoading] = useState(true);

    // const removeChat = (personId: string) => {
    //     setPersons(prevPersons => prevPersons.filter(p => p.person_id !== personId));
    // };

    useEffect(() => {
        getPotentialUsers()
            .then(res => {
                setPersons(res.data);
                setLoading(false);
            })
            .catch(e => {
                navigate('/login');
            });
    }, [navigate]);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        getUserInterests()
            .then(res => {
                if (res.data.length < 10) {
                    navigate('/cards');
                }
            });
    }, [isLoading, navigate]);

    if (persons.length === 0) {
        return (
            <div>
                <Header></Header>
                <EmptySearch></EmptySearch>
                <NavBar></NavBar>
            </div>
        )
    }
    else {
        return (
            <div>
                <Header></Header>
                <main className="main_part mt-20">
                    <div className="interests_container">
                        {persons.map((person) => (
                            <InterestsRectangle
                                key={person.id}
                                person={person}
                            />
                        ))}
                    </div>
                </main>
                <NavBar></NavBar>
            </div>
        );
    }
};

export default Chats;
