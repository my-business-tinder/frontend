import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import NavBar from "../Components/NavBar";
import {Header, useHeaderRef} from '../Components/Header';
import { Person } from "../Components/Person";
import '../StyleSheets/similiarInterests.css'
import '../StyleSheets/text_styles.css'
import '../StyleSheets/all_pages.css'
import '../StyleSheets/interests.css'
import cat from '../Png/cat.png'
import { ReactComponent as NotSeen } from '../Svg/NotSeen.svg';
import { ReactComponent as Fire} from '../Svg/Fire.svg';
import EmptySearch from "../Pages/EmptySearch";
import { useSpring, animated } from 'react-spring';
import {OtherUser} from "../api/types";
import {getPotentialUsers, getUserInterests, putRelationStatus} from "../api/api";
import {useNavigate} from "react-router-dom";

interface SwipeableCardProps {
    person: OtherUser;
    index: number;
    handleSwipe: (index: number, direction: string) => void;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({ person, index, handleSwipe }) => {
    const [springProps, setSpringProps] = useSpring(() => ({
        to: { x: 0, opacity: 1 },
        from: { x: 0, opacity: 1 },
        reset: true
    }));
    const [isRightSwiped, setIsRightSwiped] = useState(false);
    const [isLeftSwiped, setIsLeftSwiped] = useState(false);
    const [rating, setRating] = useState(0);
    const updateRatingAndCallAPI = (newRating: number) => {
        setRating(newRating);
        console.log(`User ID: ${person.id}, Rating: ${newRating}`);

        putRelationStatus({
            other_id: person.id,
            rating: newRating
        })
            .then(response => {
                console.log('Relation status updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating relation status:', error);
            });
    };

    const toggleLeftSwipe = () => {
        const newRating = isLeftSwiped ? 0 : -1;
        setIsLeftSwiped(!isLeftSwiped);
        updateRatingAndCallAPI(newRating);
    };
    const toggleRightSwipe = () => {
        const newRating = isRightSwiped ? 0 : 1;
        setIsRightSwiped(!isRightSwiped);
        updateRatingAndCallAPI(newRating);
    };
    const handlers = useSwipeable({
        onSwipedLeft: () => toggleLeftSwipe(),
        onSwipedRight: () => toggleRightSwipe(),
        trackTouch: true,
        trackMouse: true
    });
    return (
        <animated.div className="similiar_interests_card" {...handlers} style={springProps}>
            <div className="left_section">
                <img src={person?.photo_url ?? cat} alt={person.username} className="photo_card" />
                <NotSeen
                    className={isLeftSwiped ? "black not_seen" : "not_seen"}
                    onClick={toggleLeftSwipe}
                />
            </div>
            <div className="right_section">
                <div>
                    <div className="header_section">{`${person.first_name} ${person.last_name}`}</div>
                    <div className="header_thin">На {person.attraction_percentage}% схожи в интересах</div>
                </div>
                <div className="bottom_icon">
                    <Fire
                        className={isRightSwiped ? "fire_red not_seen" : "not_seen"}
                        onClick={toggleRightSwipe}
                    />
                </div>
            </div>
        </animated.div>
    );
};
const MeetNewPeople: React.FC = () => {
    const navigate = useNavigate();
    const [persons, setPersons] = useState<OtherUser[]>([]);
    const [isLoading, setLoading] = useState(true);
    const { headerRef, headerHeight } = useHeaderRef();
    const mainPartRef = useRef<HTMLDivElement>(null);
    const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
    const handleSwipe = (index: number, direction: string) => {
        setSwipeDirection(direction);
        handleNotSeenClick(index);
    };
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
    useEffect(() => {
        if (mainPartRef.current) {
            mainPartRef.current.style.marginTop = `calc(${headerHeight}px + 3vh)`;
        }
    }, [headerHeight]);
    useEffect(() => {
        if (swipeDirection !== null) {
            setSwipeDirection(null);
        }
    }, [swipeDirection]);
    const containerStyle = swipeDirection === 'left' ?
        { background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)' } :
        {};
    const handleNotSeenClick = (index: number) => {
        setPersons(prevPersons => {
            const updatedPersons = [...prevPersons];
            updatedPersons.splice(index, 1);
            return updatedPersons;
        });
    };
    return (
        <div>
            <Header ref={headerRef}/>
            {persons.length === 0 ? (
                <EmptySearch />
            ) : (
                <main className="main_part mt-20" ref={mainPartRef} style={containerStyle}>
                    <div className="interests_container">
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
export default MeetNewPeople