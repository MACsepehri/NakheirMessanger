import { LeftMainPart, CenterMainPart, RightMainPart, Img_avatar, Div_Img } from "../../styled_components/StyledMainPage";

let Main = () => {
    return (
        <>
            <div className="holder">
                <LeftMainPart>
                    <Div_Img>
                        <Img_avatar src="/src/assets/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt="" srcset="" />
                        <h1>علی ممدی</h1>
                    </Div_Img>
                </LeftMainPart>
                <CenterMainPart></CenterMainPart>
                <RightMainPart></RightMainPart>
            </div>
        </>
    )
}

export default Main;