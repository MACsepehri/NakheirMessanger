import { FormLogin, InputItem, InputSubmit, ItemDiv } from '../styled_components/StyledLoginPage'
import { styled } from 'styled-components';


export let SignUpPage = () => {
    return (
        <div className="container">

            <FormLogin action="">
                <h1>ثبت نام</h1>
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
                <InputSubmit type="submit" value="ثبت اطلاعات" />
            </FormLogin>
        </div>
    )
}