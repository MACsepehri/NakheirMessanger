import FormAuth from '../components/Login_And_Signup/FormAuth';
import { FormLogin, InputItem, InputSubmit, ItemDiv } from '../styled_components/StyledLoginPage'
import { styled } from 'styled-components';


export let SignUpPage = () => {
    return (
        <div className="container">
            <FormAuth name='ثبت نام'/>
        </div>
    )
}