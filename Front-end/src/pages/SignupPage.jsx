import { FormLogin,InputItem, InputSubmit, ItemDiv } from './LoginPage.jsx'
import { styled } from 'styled-components';


export let SignUpPage = () => {
    return (
        <div className="container">

            <FormLogin action="">
                <h1>ثبت نام</h1>
                <ItemDiv>
                    <p>نام</p>
                    <InputItem type="text" />
                </ItemDiv>
                <ItemDiv>
                    <p>ایمیل</p>
                    <InputItem type="text" />
                </ItemDiv>
                <ItemDiv>
                    <p>نام عمومی</p>
                    <InputItem type="text" />
                </ItemDiv>
                <InputSubmit type="submit" value="ثبت اطلاعات" />
            </FormLogin>
        </div>
    )
}