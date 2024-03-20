import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import '../StyleSheets/styles.css'
import '../StyleSheets/all_pages.css'
import '../StyleSheets/myAccountChanges.css'
import HeaderBack from "../Components/HeaderBack";
import { ReactComponent as Circle} from '../Svg/Circle.svg';
import circle from '../Svg/Circle.svg'
import { ReactComponent as ChangePhoto} from '../Svg/changePhoto.svg'
import changePhoto from '../Svg/changePhoto.svg'
import {Link} from "react-router-dom";
import {Person} from "../Components/Person";
import NavBar from "../Components/NavBar";

const MyAccountChanges = () => {

    const [person, setPerson] = useState<Person>({
        person_id: "",
        photo: null,
        name: "",
        vk: "",
        tg: "",
        small_about_me: "",
        big_about_me: "",
        interests: [["", null]]
    });

    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPerson(prevPerson => ({ ...prevPerson, name: event.target.value }));
    };

    const handleShortAboutChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPerson(prevPerson => ({ ...prevPerson, small_about_me: event.target.value }));
    };

    const handleDetailedAboutChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setPerson(prevPerson => ({ ...prevPerson, big_about_me: event.target.value }));
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setPerson(prevPerson => ({ ...prevPerson, photo: files[0] }));
        }
    };

    const handleClickChangePhoto = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        if (person.photo) {
            const newPhotoUrl = URL.createObjectURL(person.photo);
            setPhotoUrl(newPhotoUrl);

            return () => {
                URL.revokeObjectURL(newPhotoUrl);
            };
        }
    }, [person.photo]);

    return (
        <div>
            <HeaderBack></HeaderBack>
            <main className='change_profile mt-20'>
                <div className='change_photo_container'>
                    <img className='photo_circle' src={photoUrl || circle}
                         alt="Profile" />
                    <div className='squad'></div>
                    <img className='change_photo'
                         src={changePhoto}
                         onClick={handleClickChangePhoto}
                         alt="Change"
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </div>
                <div className='frame_container'>
                    <div className='headers_interests'>Как вас звать?</div>
                    <input
                           className='small_input'
                           placeholder='Имя, фамилия или псевдоним'
                           onChange={handleNameChange}
                    />
                </div>
                <div className='frame_container'>
                    <div className='headers_interests'>Коротко о себе</div>
                    <textarea
                        className='textarea'
                        placeholder='То, что будет отображаться в вашей карточке в рекомендациях у других людей'
                        onChange={handleShortAboutChange}
                    />
                </div>
                <div className='frame_container'>
                    <div className='headers_interests'>Соцсети и контакты</div>
                    <Link to='/my-account/changes/contacts'>
                        <div className='whitespace-nowrap headers_interests'>Добавить новые &#8250;</div>
                    </Link>
                </div>
                <div className='frame_container'>
                    <div className='headers_interests'>О себе(поподробнее)</div>
                    <textarea
                        className='textarea'
                        placeholder='Чем занимаетесь, ваши увлечения, мировоззрение, истории из жизни и прочее'
                        onChange={handleDetailedAboutChange}
                    />
                </div>
            </main>
            <NavBar></NavBar>
        </div>
    );
};

export default MyAccountChanges;