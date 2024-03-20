import React, {useEffect, useState} from 'react';
import {useSwipeable} from 'react-swipeable';
import '../StyleSheets/cards.css';
import '../StyleSheets/text_styles.css';
import first from '../Png/1.1.png'
import second from '../Png/2.1.png'
import third from '../Png/3.1.png'
import fourth from '../Png/4.1.png'
/*import { ReactComponent as PreviousCard} from '../Svg/previousCard.svg';*/
import EmptySearch from "../Pages/EmptySearch";
import { useSpring, animated} from "react-spring";
import {getInterests, getUserInterests, putUserInterest} from "../api/api";
import {useNavigate} from "react-router-dom";
import {CardProps, HobbyAssessment} from "../api/types";
import HeaderBack from "../Components/HeaderBack";


const Card: React.FC<CardProps> = ({ hobby }) => {
    return (
        <div className='cards cards_size'>
            <div className='cards_text'>{hobby.interest_title}</div>
        </div>
    );
};

const SwipeCards = () => {
    const [isAuth, setAuth] = useState(false);
    const [hobbies, setHobbies] = useState<HobbyAssessment[]>([]);
    const [currentHobbyIndex, setCurrentHobbyIndex] = useState(0);
    const [allHobbiesShown, setAllHobbiesShown] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState('');
    const [nextHobbyIndex, setNextHobbyIndex] = useState(1);
    const navigate = useNavigate();

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            console.log(`Swiped ${eventData.dir}`);
            const newRating = eventData.dir === 'Left' ? 1 :
                eventData.dir === 'Down' ? 2 :
                    eventData.dir === 'Right' ? 3 :
                        eventData.dir === 'Up' ? 4 : null;
            if (newRating !== null) {
                updateHobbyRating(newRating);
            }
            setSwipeDirection(eventData.dir);
        },
        trackTouch: true,
        trackMouse: true
    });

    const props = useSpring({
        to: {
            opacity: swipeDirection ? 0 : 1,
            transform: swipeDirection === 'Right' ? 'translateX(100vw) translateY(0vh)' :
                swipeDirection === 'Left' ? 'translateX(-100vw) translateY(0vh)' :
                    swipeDirection === 'Up' ? 'translateX(0vw) translateY(-100vh)' :
                        swipeDirection === 'Down' ? 'translateX(0vw) translateY(100vh)' :
                            'translateX(0vw) translateY(0vh)',
        },
        from: {
            opacity: 1,
            transform: 'translateX(0vw) translateY(0vh)',
        },
        reset: true,
        onRest: () => {
            if (swipeDirection) {
                setSwipeDirection('');
                if(currentHobbyIndex < hobbies.length - 1) {
                    setCurrentHobbyIndex(currentHobbyIndex + 1);
                    setNextHobbyIndex(currentHobbyIndex + 2);
                } else {
                    setAllHobbiesShown(true);
                }
            }
        },
    });

    /*const goToPreviousHobby = () => {
        if (currentHobbyIndex > 0) {
            setCurrentHobbyIndex(currentHobbyIndex - 1);
        }
    };*/

    const handleSwipe = (rating: number) => {
        const direction = rating === 1 ? 'Left' : rating === 2 ? 'Down' : rating === 3 ? 'Right' : 'Up';
        setSwipeDirection(direction);

        if (currentHobbyIndex < hobbies.length) {
            const updatedHobby = {
                ...hobbies[currentHobbyIndex],
                rating: rating
            };

            putUserInterest({
                id: updatedHobby.interest_id,
                rating: rating
            })
                .then(res => {
                    const updatedHobbies = [...hobbies];
                    updatedHobbies[currentHobbyIndex] = updatedHobby;
                    setHobbies(updatedHobbies);
                })
                .catch(e => console.error('Error updating interest:', e));
        }
    };


    useEffect(() => {
        if (!isAuth) {
            return;
        }
        getInterests()
            .then(res => {
                const formattedHobbies = res.data.map(hobby => ({
                    interest_id: hobby.id,
                    interest_title: hobby.title,
                    rating: null
                }));
                setHobbies(formattedHobbies);
                console.log(res.data)
            })
            .catch(error => {
                console.error('Error fetching interests:', error);
            });
    }, [navigate, isAuth]);

    useEffect(() => {
        getUserInterests()
            .then(res => {
                if (res.data.length >= 10) {
                    navigate('/my-account');
                }
                setCurrentHobbyIndex(res.data.length);
                setAuth(true);
            })
            .catch(e => navigate('/login'));
    }, [navigate]);

    useEffect(() => {
        if (currentHobbyIndex > 10) {
            navigate('/my-account');
        }
    }, [navigate, currentHobbyIndex]);

    const updateHobbyRating = (rating: number) => {
        if (currentHobbyIndex < hobbies.length) {
            const hobby = hobbies[currentHobbyIndex];
            const updatedHobby = {
                ...hobby,
                rating: rating
            };

            putUserInterest({
                id: updatedHobby.interest_id,
                rating: rating
            })
                .then(res => {
                    console.log('Interest updated:', res.data);
                    const updatedHobbies = [...hobbies];
                    updatedHobbies[currentHobbyIndex] = updatedHobby;
                    setHobbies(updatedHobbies);
                })
                .catch(e => console.error('Error updating interest:', e));
        }
    };

    if (allHobbiesShown) {
        return (
            <div>
                <HeaderBack></HeaderBack>
                <EmptySearch></EmptySearch>
            </div>
        );
    }

    return (
        <div>
            <HeaderBack></HeaderBack>
            <main className='main_container'>
                <div {...handlers}>
                    <animated.div style={props} className='cards_container'>
                        {hobbies.length > 0 && (
                            <Card hobby={hobbies[currentHobbyIndex]} />
                        )}
                        {nextHobbyIndex < hobbies.length && (
                            <div className="next_card">
                                <Card hobby={hobbies[nextHobbyIndex]} />
                            </div>
                        )}
                    </animated.div>
                </div>
                <div className='bottom_container'>
                    {/*<div className='previous_card'>
                        <PreviousCard
                            className='smiles_size'
                            onClick={goToPreviousHobby}
                        />
                    </div>*/}
                    <div className='smiles_container'>
                        <img className='smiles_size' src={first} alt='First' onClick={() => handleSwipe(1)}/>
                        <img className='smiles_size' src={second} alt='Second' onClick={() => handleSwipe(2)}/>
                        <img className='smiles_size' src={third} alt='Third' onClick={() => handleSwipe(3)}/>
                        <img className='smiles_size' src={fourth} alt='Fourth' onClick={() => handleSwipe(4)}/>
                    </div>
                    {/*<div className='previous_card'>
                        <PreviousCard
                            className='smiles_size not_shown'
                        />
                    </div>*/}
                </div>
            </main>
        </div>
    );
};

export default SwipeCards;