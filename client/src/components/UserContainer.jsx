import React, { useState, useContext, useEffect} from 'react';
import Cookies from 'universal-cookie';
import LogoutIcon from '../assets/logout.png';
import { Avatar } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { CirclePicker } from 'react-color';


const cookies = new Cookies();

const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
}

const colors = [
    '#e91e63',
    '#4B296B',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
    '#121212',
  ]

const UserInfo = () => {
    const client = StreamChat.getInstance('fc43mz75twb4');
    const imageUrl = client.user.image;
    const name = client.user.fullName;

    return(
        <div className='user__list__col'>
            <Avatar image={imageUrl} name={name}  size={125} />
            <p className="user__list__text"> {name} </p>
        </div>
    )
}

const UserColor = ({setColor, color}) => {

    const handleChange = (color) => {
        setColor(color)
    };

    return(
        <div className='user__list__col'>
            <p className="user__list__text"> Change Background  </p>
            <div className='user__list__colorbtn__background'> 
                <CirclePicker
                    colors={colors}
                    width="100%"
                    color={color}
                    onChangeComplete={handleChange}
                /> 
            </div>
        </div>  
    )
}

const UserLogout = () => {
    return (
        <div className='user__list__row'>
            <div className="user__list_icon">
                <div className="icon1__inner" onClick={logout}>
                    <img src={LogoutIcon} alt="Logout" width="30" />
                </div>
            </div>
            <p className="user__list__text"> Logout </p>
        </div>
    )
}


const UserContainer = ({setColor, color}) => {
    return(
        <div className="user__list__wrapper" style={{backgroundColor: color}} >
            <UserInfo/>
            <UserColor  color={color} setColor={setColor}/>
            <UserLogout/>
        </div>
    );
}

export default UserContainer