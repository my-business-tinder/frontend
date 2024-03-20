import React from 'react';
import HeaderBack from "../Components/HeaderBack";
import '../StyleSheets/styles.css'
import '../StyleSheets/myAccountChanges.css'

const Contacts = () => {
    return (
        <div>
            <HeaderBack></HeaderBack>
            <main className='change_profile mt-20'>
                <div className='frame_container'>
                    <div className='headers_interests'>tg</div>
                    <input className='small_input' type='url' placeholder='Ссылка'></input>
                </div>
                <div className='frame_container'>
                    <div className='headers_interests'>vk</div>
                    <input className='small_input' type='url' placeholder='Ссылка'></input>
                </div>
                <div className='frame_container'>
                    <div className='headers_interests'>Номер телефона</div>
                    <input className='small_input' type='tel' placeholder='Номер'></input>
                </div>
            </main>
        </div>
    );
};

export default Contacts;