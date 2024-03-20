import React, {useEffect, useRef, useState} from 'react';
import NavBar from "../Components/NavBar";
import '../StyleSheets/myAccount.css'
import '../StyleSheets/all_pages.css'
// import {Person} from '../Components/Person'
import cat from '../Png/cat.png'
import '../StyleSheets/styles.css'
import '../StyleSheets/text_styles.css'
import '../StyleSheets/interests.css'
import '../StyleSheets/similiarInterests.css'
import {Header, useHeaderRef} from "../Components/Header";
import { User, UserInterest} from "../api/types";
import { getUser, getUserInterests } from '../api/api'
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
    const [user, setUser] = useState<User | null>(null);
    const [interests, setInterests] = useState<UserInterest[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('fetch user');
        getUser()
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(e => {
                console.log('error while fetching user:', e);
                navigate('/login');
            });

    }, [navigate]);

    useEffect(()  => {
        if (!user) {
            return;
        }
        console.log('fetching user interests');

        getUserInterests()
            .then(res => {
                if (res.data.length < 10) {
                    console.log(res.data);
                    navigate('/cards');
                }
                setInterests(res.data);
            });
    }, [user, navigate]);

    /*useEffect(() => {
        const fetchData = async () => {
            const result = await getPersonInfo();

            console.log(result.data?.bio)
        };

        fetchData();
    }, []);*/

    // const person: Person = {
    //     person_id: "12345",
    //     photo: null,
    //     name: "Oxxymiron",
    //     vk: "bruhniggaxd",
    //     tg: "bruhniggaxd",
    //     small_about_me: "69 лет, и швец и жнец и на дуде игрец, любитель пива",
    //     big_about_me: "Я в своем познании настолько преисполнился, что я как будто бы уже сто триллионов миллиардов лет " +
    //         "проживаю на триллионах и триллионах таких же планет, как эта Земля, мне этот мир абсолютно понятен, и я " +
    //         "здесь ищу только одного - покоя, умиротворения и вот этой гармонии, от слияния с бесконечно вечным, от " +
    //         "созерцания великого фрактального подобия и от вот этого замечательного всеединства существа, бесконечно " +
    //         "вечного, куда ни посмотри, хоть вглубь - бесконечно малое, хоть ввысь - бесконечное большое, понимаешь?\n"
    //         + "🐋💨\n" +
    //         "А ты мне опять со своим вот этим, иди суетись дальше, это твоё распределение, это твой путь и твой горизонт" +
    //         " познания и ощущения твоей природы, он несоизмеримо мелок по сравнению с моим, понимаешь?💪 Я как будто бы " +
    //         "уже давно глубокий старец, бессмертный, ну или там уже почти бессмертный, который на этой планете от её " +
    //         "самого зарождения, ещё когда только Солнце только-только сформировалось как звезда, и вот это газопылевое " +
    //         "облако,\n",
    //     interests: [["Книги", 4], ['Лыжи', 3], ["Аниме", 4], ['Дорамы', 4], ['Экстремальные виды спорта', 3],
    //         ["спортивное программирование", 4]]
    // };

    const [displayCount] = useState(5);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const interestsToDisplay = interests
        .sort((a, b) => {
            const aValue = a.rating !== null ? a.rating : -Infinity;
            const bValue = b.rating !== null ? b.rating : -Infinity;

            return bValue - aValue;
        });

    const { headerRef, headerHeight } = useHeaderRef();
    const mainPartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mainPartRef.current) {
            mainPartRef.current.style.marginTop = `calc(${headerHeight}px + 3vh)`;
        }
    }, [headerHeight]);

    if (!user) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <Header ref={headerRef}></Header>
            <main className='person_page mt-20' ref={mainPartRef}>
                <div className="user_information">
                    <div className="content_wrapper">
                        <div className="text_content">
                            <div className='header_bold'>{`${user?.first_name} ${user?.last_name}`}</div>
                            {/* <div className='header_thin'>{person.small_about_me}</div> */}
                            {/* <div className='header_thin'>vk: @{person.vk}</div> */}
                            <div className='header_thin'>{`tg: @${user?.username}`}</div>
                        </div>
                        <div className='image_content_wrapper'>
                            <img className='profile_photo' src={user?.photo_url ?? cat} alt='аватарка'/>
                        </div>
                    </div>
                </div>
                <div className='interests'>
                    <div className='headers_interests'>
                        <div className='header_section'>Интересы</div>
                        {/* <Link to='/my-account/interests'>
                            <div className="add_interests whitespace-nowrap">Настроить &#8250;</div>
                        </Link> */}
                    </div>
                    <div className='about_me'>
                        {interestsToDisplay.length > 0 && (
                            <div>
                                {interestsToDisplay
                                    .slice(0, isExpanded ? interestsToDisplay.length : displayCount)
                                    .map((element, index) => {
                                        if (element.rating === 4) {
                                            return (
                                                <div key={index} className='header_thin font-bold'>
                                                    {element.interest_title}
                                                </div>
                                            );
                                        } else if (element.rating === 3) {
                                            return (
                                                <div key={index} className='header_thin'>
                                                    {element.interest_title}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                {interestsToDisplay.length > 5 && (
                                    <button onClick={handleToggleExpand}>
                                        {isExpanded ? (
                                            <div className='add_interests margin_button'>свернуть &#8593;</div>
                                        ) : (
                                            <div className='add_interests margin_button'>показать еще &#8595;</div>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/* <div className='interests'>
                    <div className='headers_interests'>
                        <div className='header_section'>О себе</div>
                    </div>
                    <div className='about_me'>
                        <div className='header_thin'>{person.big_about_me}</div>
                    </div>
                </div> */}
                <NavBar></NavBar>
            </main>
        </div>
    );
};

export default MyAccount;