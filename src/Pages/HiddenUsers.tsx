import React, {useState} from 'react';
import HeaderBack from "../Components/HeaderBack";
import NavBar from "../Components/NavBar";
import {Person} from "../Components/Person";
import cat from '../Png/cat.png'
import  { ReactComponent as Seen} from '../Svg/seen.svg';
import EmptySearch from "../Pages/EmptySearch";

const HiddenUsers = () => {

    interface ExtendedPerson extends Person {
        mutualProcent: number
    }

    const person1: ExtendedPerson = {
        person_id: "1",
        photo: null,
        name: "Стив Джобс",
        vk: "",
        tg: "",
        small_about_me: "47 лет, старший специалист по фигне",
        big_about_me: "",
        interests: [["Книги", 4], ['Лыжи', 2]],
        mutualProcent: 70
    }

    const person2: ExtendedPerson = {
        person_id: "2",
        photo: null,
        name: "Молния Маквин Абдурахмангаджанович",
        vk: "",
        tg: "",
        small_about_me: "кчау",
        big_about_me: "",
        interests: [["Книги", 1], ['Лыжи', 4]],
        mutualProcent: 69
    }

    const person3: ExtendedPerson = {
        person_id: "3",
        photo: null,
        name: "Дима Масленников",
        vk: "",
        tg: "",
        small_about_me: "Я в своем познании настолько преисполнился, что я как будто бы уже сто триллионов " +
            "миллиардов лет проживаю на триллионах и триллионах таких же планет, как эта Земля",
        big_about_me: "",
        interests: [["Книги", 3], ['Лыжи', 3]],
        mutualProcent: 49
    }

    const [persons] = useState<ExtendedPerson[]>([person1, person2, person3]);

    const hiddenUsers = persons.length === 0

    if (hiddenUsers) {
        return (
            <div>
                <HeaderBack></HeaderBack>
                <EmptySearch></EmptySearch>
                <NavBar></NavBar>
            </div>
        )}

    else {
        return (
            <div>
                <HeaderBack></HeaderBack>
                <main className="main_part mt-20">
                    <div className="interests_container">
                        {persons.map((person) => (
                            <div className="interests_rectangle">
                                <div className="menu">
                                    <img src={cat}></img>
                                </div>
                                <div className="interests_text">
                                    <div>{person.name}</div>
                                </div>
                                <div className="menu">
                                    <Seen className="menu_svg"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                <NavBar></NavBar>
            </div>
        )}
};

export default HiddenUsers;