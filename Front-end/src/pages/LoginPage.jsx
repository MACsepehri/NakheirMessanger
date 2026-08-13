import '../css/Main.css'
import { styled } from 'styled-components';

export default function LoginPage() {
    let FormLogin = styled.form
        `
    padding-top:1%;
    width:400px;
    height:500px;
    background-color:#1A1953;
    border-radius:40px;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:40px;
    &:hover{
    box-shadow:0px 0px 30px #1A1953 ;
    transform:translateY(-1%);
    }
    `
    let ItemDiv = styled.div
        `
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
    `
    let InputItem = styled.input
        `
    width:80%;
    height:35px;
    background: transparent;
    border:0;
    border-bottom : 2px solid black;
    outline:none;
    &:hover{
    border-bottom : 2px solid #2342be;
    }
    &:focus{
        border-bottom : 2px solid #2342be;
    }
    `

    let InputSubmit = styled.input
        `
    width:150px;
    height:40px;
    border-radius:10px;
    background-color: #2F2FE4;
    border:none;
    box-shadow:0px 0px 10px #2F2FE4;
    cursor:pointer;
    &:hover{
    transform:scale(1.1);
    }
    `
    return (
        <>
            <div className="container">
                <FormLogin action="" className="login">
                    <h1>ورود</h1>
                    <ItemDiv className="item">
                        <p>نام کاربری</p>
                        <InputItem type="text" />
                    </ItemDiv>
                    <ItemDiv className="item">
                        <p>رمز عبور</p>
                        <InputItem type="password" />
                    </ItemDiv>
                    <ItemDiv className="item">
                        <p>تکرار رمز عبور</p>
                        <InputItem type="password" />
                    </ItemDiv>
                    <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" />
                </FormLogin>
            </div>
        </>
    )
}