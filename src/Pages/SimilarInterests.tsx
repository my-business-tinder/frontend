import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../Components/NavBar';
import { Header, useHeaderRef } from "../Components/Header";
import { SwipeableCard } from "../Pages/MeetNewPeople";
// import {Person} from "Components/Person";
import '../StyleSheets/similiarInterests.css';
import '../StyleSheets/text_styles.css';
import '../StyleSheets/all_pages.css';
import '../StyleSheets/interests.css';
import EmptySearch from "../Pages/EmptySearch";
import { useNavigate } from "react-router-dom";
import { OtherUser } from '../api/types';
import {getSimilarUsers, getUserInterests} from '../api/api';

const SimilarInterests = () => {
    const navigate = useNavigate();
    const [persons, setPersons] = useState<OtherUser[]>([]);
    const [isLoading, setLoading] = useState(true);

    const { headerRef, headerHeight } = useHeaderRef();
    const mainPartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getSimilarUsers()
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

    useEffect(() => {
        if (mainPartRef.current) {
            mainPartRef.current.style.marginTop = `calc(${headerHeight}px + 3vh)`;
        }
    }, [headerHeight]);

    const handleNotSeenClick = (index: number) => {
        setPersons(prevPersons => {
            const updatedPersons = [...prevPersons];
            updatedPersons.splice(index, 1);
            return updatedPersons;
        });
    };

    const handleSwipe = (index: number) => {
        handleNotSeenClick(index);
    };

    return (
        <div>
            <Header ref={headerRef}/>
            {persons.length === 0 ? (
                <EmptySearch />
            ) : (
                <main className="main_part mt-20" ref={mainPartRef}>
                    <div className="interests_gap">
                        {persons.map((person, index) => (
                            <SwipeableCard
                                key={person.id}
                                person={person}
                                index={index}
                                handleSwipe={handleSwipe}
                            />
                        ))}
                    </div>
                </main>
            )}
            <NavBar />
        </div>
    );
};

export default SimilarInterests;
