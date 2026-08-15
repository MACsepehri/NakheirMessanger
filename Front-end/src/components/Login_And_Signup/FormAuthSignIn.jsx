import { useEffect } from 'react'
import { FormLogin, InputSubmit } from '../../styled_components/StyledLoginPage'
import FormAuthSignUpItem from './FormAuthSignUpItem'
let FormAuthSignIn = ({ name }) => {
    let SubmitHandler = async () => {
        event.preventDefault();
        let input = document.getElementById('password1');
        let input2 = document.getElementById('password2');
        let res = await fetch('http://127.0.0.1:5000/check-password?password=' + input.value);
        let alertpass = document.querySelector('.alertpassword1');
        let alertpass2 = document.querySelector('.alertpassword2');
        let data = await res.json();
        console.log(data);
        if (data.same) {
            input.style.borderBottom = '2px solid red';
            alertpass.innerHTML = 'این رمز تکراری است'
        } else {
            input.style.borderBottom = '2px solid #9112BC';
            alertpass.innerHTML = ''
        }
        if (input.value !== input2.value) {
            input2.style.borderBottom = '2px solid red';
            alertpass2.innerHTML = 'این رمز تکراری است'
        }
        else{
            input2.style.borderBottom = '2px solid #9112BC';
            alertpass2.innerHTML = ''

        }

    }
    return (
        <FormLogin action="" className="login" onSubmit={() => { SubmitHandler() }}>
            <h1>{name}</h1>
            <FormAuthSignUpItem ItemName='نام کاربری' InputType='text' IDNAME='TextInput' />
            <FormAuthSignUpItem ItemName='رمز عبور' InputType='password' IDNAME='password1' />
            <FormAuthSignUpItem ItemName='تکرار رمز عبور' InputType='password' IDNAME='password2' />
            <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" />
        </FormLogin>
    )
}

export default FormAuthSignIn;