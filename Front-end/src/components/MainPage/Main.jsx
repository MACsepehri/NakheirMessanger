import { LeftMainPart,CenterMainPart,RightMainPart } from "../../styled_components/StyledMainPage";

let Main = () => {
    return (
        <>
        <div className="holder">
            <LeftMainPart></LeftMainPart>
            <CenterMainPart></CenterMainPart>
            <RightMainPart></RightMainPart>
        </div>
        </>
    )
}

export default Main;