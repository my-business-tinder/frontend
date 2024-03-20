import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';
import React from 'react';
import { saveToken } from '../api/token';
import { useNavigate } from 'react-router';
import '../StyleSheets/index.css'

const BOT_USERNAME = 'business_tinder_tg_bot';
const BASE_URL = 'https://158.160.82.168/api';

type TelegramUser = {
  auth_date: number,
  first_name: string,
  last_name?: string | undefined,
  hash: string,
  id: number,
  photo_url?: string | undefined,
  username?: string | undefined
};

export const TelegramLogin = () => {
  const navigate = useNavigate();

  const onTelegramAuth = (user: TelegramUser) => {
    console.log('Log in data', user);
    fetch(`${BASE_URL}/auth/telegram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
          saveToken(data.access_token);
          navigate('/cards');
        }) // auth token here
        .catch(error => console.error(error));
  }

  return (
      <div className='flex justify-center items-center h-screen'>
        <TLoginButton
            botName={BOT_USERNAME}
            buttonSize={TLoginButtonSize.Large}
            lang="ru"
            usePic={false}
            cornerRadius={20}
            onAuthCallback={(user) => onTelegramAuth(user)}
            requestAccess={'write'}
        />
      </div>
  );
};

