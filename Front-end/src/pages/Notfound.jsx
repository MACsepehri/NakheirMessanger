import { Link } from "react-router-dom"
import styled from "styled-components";
import '../css/Main.css'

let NotFoundPage = () => {

    let BoxNotFound = styled.div
        `
        width: 600px;
    height: 400px;
    background-color: #282828;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 80px;
    gap: 40px;
    color: white;
    `
    let ImgBox = styled.img
    `
        width: 200px;
    ` 
    return (
        <div className="container">
            <BoxNotFound>
                <ImgBox src="src/assets/orange-error-icon-0.png" alt="" />
                <h1>صفحه مورد نظر شما پیدا نشد</h1>
                <Link to='/'>رفتن به صفحه اصلی</Link>
            </BoxNotFound>
        </div>
    )
};

export default NotFoundPage;