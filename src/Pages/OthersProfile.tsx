import React, {useEffect, useRef} from 'react';
import NavBar from '../Components/NavBar'
import {Person} from "../Components/Person";
import cat from '../Png/cat.png'
import {useHeaderRef} from "../Components/Header";
import HeaderBack from "../Components/HeaderBack";

const OthersProfile = () => {

    interface ExtendedPerson extends Person {
        mutualProcent: number
    }

    const person: ExtendedPerson = {
        person_id: "12345",
        photo: null,
        name: "Oxxymiron",
        vk: "bruhniggaxd",
        tg: "bruhniggaxd",
        small_about_me: "69 лет, и швец и жнец и на дуде игрец, любитель пива",
        big_about_me: "Я в своем познании настолько преисполнился, что я как будто бы уже сто триллионов миллиардов лет " +
            "проживаю на триллионах и триллионах таких же планет, как эта Земля, мне этот мир абсолютно понятен, и я " +
            "здесь ищу только одного - покоя, умиротворения и вот этой гармонии, от слияния с бесконечно вечным, от " +
            "созерцания великого фрактального подобия и от вот этого замечательного всеединства существа, бесконечно " +
            "вечного, куда ни посмотри, хоть вглубь - бесконечно малое, хоть ввысь - бесконечное большое, понимаешь?\n"
            + "🐋💨\n" +
            "А ты мне опять со своим вот этим, иди суетись дальше, это твоё распределение, это твой путь и твой горизонт" +
            " познания и ощущения твоей природы, он несоизмеримо мелок по сравнению с моим, понимаешь?💪 Я как будто бы " +
            "уже давно глубокий старец, бессмертный, ну или там уже почти бессмертный, который на этой планете от её " +
            "самого зарождения, ещё когда только Солнце только-только сформировалось как звезда, и вот это газопылевое " +
            "облако,\n",
        interests: [["Книги", 4], ['Лыжи', 2], ["Аниме", 4], ['Дорамы', 1], ['Экстремальные виды спорта', 3]],
        mutualProcent: 50
    };

    const { headerRef, headerHeight } = useHeaderRef();
    const mainPartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mainPartRef.current) {
            mainPartRef.current.style.marginTop = `calc(${headerHeight}px + 3vh)`;
        }
    }, [headerHeight]);

    return (
        <div>
            <HeaderBack ref={headerRef}/>
            <main className='person_page mt-20' ref={mainPartRef}>
                <div className="user_information">
                    <div className="content_wrapper">
                        <div className="text_content">
                            <div className='header_bold'>{person.name}</div>
                            <div className='header_thin'>{person.small_about_me}</div>
                            <div className='header_thin'>vk: @{person.vk}</div>
                            <div className='header_thin'>tg: @{person.tg}</div>
                        </div>
                        <div className='image_content_wrapper'>
                            <img className='profile_photo' src={cat}></img>
                        </div>
                    </div>
                </div>
                <div className='interests'>
                    <div className='headers_interests'>
                        <div className='header_section'>Интересы</div>
                        <div className="">Cовпадают с вашими на {person.mutualProcent}%!</div>
                    </div>
                    <div className='about_me'>
                        {person.interests.sort((a, b) => {
                            const aValue = a[1] !== null ? a[1] : -Infinity;
                            const bValue = b[1]!== null ? b[1] : -Infinity;

                            return bValue - aValue;
                        })
                            .map(element => {
                                    if (element[1] === 4) {
                                        return (
                                            <div className='header_thin font-bold'>
                                                {element[0]}
                                            </div>
                                        );
                                    } else if (element[1] === 3) {
                                        return (
                                            <div className='header_thin'>
                                                {element[0]}
                                            </div>
                                        );
                                    }
                                }
                            )}
                    </div>
                </div>
                <div className='interests'>
                    <div className='headers_interests'>
                        <div className='header_section'>О себе</div>
                    </div>
                    <div className='about_me'>
                        <div className='header_thin'>{person.big_about_me}</div>
                    </div>
                </div>
            </main>
            <NavBar></NavBar>
        </div>
    );

};

export default OthersProfile;