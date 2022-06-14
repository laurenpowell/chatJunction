import React, { useState, useContext} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import SettingsIcon from '../src/assets/settings.png'
//import { CirclePicker } from 'react-color';

import { ChannelListContainer, ChannelContainer, Auth, UserContainer, ColorContext } from './components';

import '@stream-io/stream-chat-css/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = 'fc43mz75twb4';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}



const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [show, setShow] = useState(false);
    const [color, setColor] = useState('#4B296B');

    if(!authToken) return <Auth />

    
    return (
        <>
            <div className="app__header" style={{backgroundColor: color.hex}}>
                <p className="app__header_text">Chat Junction</p>
    
                <div className="app__header_icon2">
                    <div className="icon1__inner" onClick={() => setShow(!show)} >
                        <img src={SettingsIcon} alt="UserInfo" width="30" />
                    </div>
                </div>
            </div>
                
            <div className="app__wrapper" >
                <Chat client={client} theme="team light" >
                    <ChannelListContainer 
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing} 
                        color={color.hex} 
                    />
                    <ChannelContainer 
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        createType={createType}
                    />
                </Chat>
                {show ? <UserContainer 
                    color={color.hex} setColor={setColor}
                /> : null}
            </div>
            
        </>
    );
}

export default App;