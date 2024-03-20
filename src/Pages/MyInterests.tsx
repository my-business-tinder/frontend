import React, { useState } from 'react';
import NavBar from "../Components/NavBar";
import "../StyleSheets/interests.css"
import HeaderBack from "../Components/HeaderBack";
import '../StyleSheets/styles.css'
import "../StyleSheets/all_pages.css"
import first from '../Png/1.1.png'
import second from '../Png/2.1.png'
import third from '../Png/3.1.png'
import fourth from '../Png/4.1.png'
import { ReactComponent as Menu } from '../Svg/menu.svg'
import { Link } from "react-router-dom";

interface Interest {
    person_id: string,
    id: number,
    rating: number,
    interest_name: string
    hasChanged?: boolean;
    originalRating: number
}

const MyInterests: React.FC = () => {
    const [interests, setInterests] = useState<Interest[]>([
        { person_id: '', id: 1, rating: 2, interest_name: 'кейпоп', originalRating: 2, hasChanged: false},
        { person_id: '', id: 2, rating: 4, interest_name: 'книги', originalRating: 4, hasChanged: false},
        { person_id: '', id: 3, rating: 3, interest_name: 'спортивное программирование на bash',
            originalRating: 3, hasChanged: false }
    ]);

    const getInterestSvg = (rating: number) => {
        switch (rating) {
            case 1: return <img src={first} className='svg_smiles' alt="1 из 4" />;
            case 2: return <img src={second} className='svg_smiles' alt="2 из 4" />;
            case 3: return <img src={third} className='svg_smiles' alt="оценка 3 из 4" />;
            case 4: return <img src={fourth} className='svg_smiles' alt="оценка 4 из 4" />;
            default: return null;
        }
    };

    const [, setActiveMenu] = useState<number | null>(null);

    const updateRating = (id: number, newRating: number) => {
        setInterests(interests.map(interest => {
            if (interest.id === id) {
                const isRevertedBack = interest.originalRating === newRating;
                return { ...interest, rating: newRating, hasChanged: !isRevertedBack };
            }
            return interest;
        }));
        setActiveMenu(null);
    };

    const InterestsContainer: React.FC<{ interests: Interest[] }> = ({ interests }) => {
        const [activeMenu, setActiveMenu] = useState<number | null>(null);

        const toggleMenu = (id: number) => {
            setActiveMenu(activeMenu === id ? null : id);
        };

        return (
            <div className="interests_container">
                {interests.map((interest) => (
                    <div className='interests_rectangle'
                         key={interest.id}
                         style={{
                             position: 'relative',
                             backgroundColor: interest.hasChanged ? '#ECEFF1' : ''
                         }}
                    >
                        {activeMenu === interest.id && (
                            <div className='overlayRectangle'>
                                {[1, 2, 3, 4].map(rating => (
                                    <img
                                        key={rating}
                                        src={[first, second, third, fourth][rating - 1]}
                                        className='svg_smiles'
                                        alt={`${rating} из 4`}
                                        onClick={() => updateRating(interest.id, rating)}
                                    />
                                ))}
                            </div>
                        )}
                        <div className='menu'>
                            {getInterestSvg(interest.rating)}
                        </div>
                        <div className='interests_text'>
                            <div>{interest.interest_name}</div>
                        </div>
                        <div className="menu" onClick={() => toggleMenu(interest.id)}>
                            <Menu
                                className="menu_svg"
                            />
                        </div>
                    </div>
                ))}
                <div className='flex justify-center'>
                    <Link to="/cards">
                        <div className='add_interests whitespace-nowrap'>Добавить новые
                            интересы &#8250;
                        </div>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div>
            <HeaderBack />
            <main className="main_part mt-20">
                <InterestsContainer interests={interests} />
            </main>
            <NavBar />
        </div>
    );
};

export default MyInterests;
