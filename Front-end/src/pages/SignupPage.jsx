import FormAuthSignIn from '../components/Login_And_Signup/FormAuthSignIn';
import { FormLogin, InputItem, InputSubmit, ItemDiv } from '../styled_components/StyledLoginPage'
import { styled } from 'styled-components';


export let SignUpPage = () => {
    return (
        <div className="container">
            <FormAuthSignIn name='ثبت نام'/>
        </div>
    )
}