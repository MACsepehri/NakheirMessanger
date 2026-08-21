import { useEffect } from "react";
import { LeftMainPart, CenterMainPart, RightMainPart, Img_avatar, Div_Img, Avatar } from "../../styled_components/StyledMainPage";
import { io } from 'socket.io-client';

let Main = () => {
    const socket = io(`http://${window.location.host}`);
    let storedName = JSON.parse(sessionStorage.getItem('user'));
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
                </LeftMainPart>
                <CenterMainPart></CenterMainPart>
                <RightMainPart></RightMainPart>
            </div>
        </>
    )
}

export default Main;