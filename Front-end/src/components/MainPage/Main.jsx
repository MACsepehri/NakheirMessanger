import { useEffect } from "react";
import { LeftMainPart, CenterMainPart, RightMainPart, Img_avatar, Div_Img, Avatar,ItemHandlerDiv, ItemLeft } from "../../styled_components/StyledMainPage";
import { io } from 'socket.io-client';
import { redirect, useNavigate } from "react-router-dom";
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faMessage,faComments, faUsers,faPhone,faBoxArchive,faGear } from '@fortawesome/free-solid-svg-icons';

let Main = () => {
    // const socket = io(`http://${window.location.host}`);
    // socket.on('connect',() => {
    //     console.log('connected');
    // })
    // socket.on('disconnect',() => {
    //     console.log('disconnected');
    // })
    // console.log(socket.id);

    // socket.on('chat:message',(message) => {
    //     console.log(message);
    // })
    // let data = {'message':'i am not ali'}
    // socket.emit('chat:message', data)
    let storedName = JSON.parse(sessionStorage.getItem('user'));
    let login = false;
    let navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem('user')) {
            navigate('/login');
        }
    }, [navigate]);

    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    if (!user) return <div>Loading...</div>;
    return (
        <>
            <div className="holder">
                <LeftMainPart>
                    <Div_Img>
                        <Avatar>
                            <Img_avatar src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" />
                        </Avatar>
                        <h1>{storedName.name}</h1>
                    </Div_Img>
	    	    <ItemHandlerDiv>
	    <ItemLeft id='ActiveLeft' >
	    <h1>پیام ها</h1>
	    <FontAwesomeIcon icon={faComments} />
	    </ItemLeft>
	    <ItemLeft  >
            	<h1>مخاطبین</h1>
            	<FontAwesomeIcon icon={ faUser } id='UserLeft' />
            </ItemLeft>
	    <ItemLeft>
            	<h1 id="Little">پیام های ذخیره شده</h1>
            	<FontAwesomeIcon icon={ faBoxArchive } id='UserLeft' />
            </ItemLeft>
	    <ItemLeft>
            	<h1>تنظیمات </h1>
            	<FontAwesomeIcon icon={ faGear } id='UserLeft' />
            </ItemLeft>
	    </ItemHandlerDiv>
                </LeftMainPart>
                <CenterMainPart></CenterMainPart>
                <RightMainPart></RightMainPart>
            </div>
        </>
    )

}

export default Main;
