import { useEffect, useContext } from 'react'
import { FormLogin, InputSubmit } from '../../styled_components/StyledLoginPage'
import FormAuthSignUpItem from './FormAuthSignUpItem'
import { MessengerContext } from '../../Context/MessengerContext';
let FormAuthSignIn = ({ name }) => {
    let dt = useContext(MessengerContext);
    let SubmitHandler = async () => {
        event.preventDefault();
        let input = document.getElementById('password1');
        let input2 = document.getElementById('password2');
        let input3 = document.getElementById('TextInput');
        let res = await fetch('http://127.0.0.1:5000/check-password?password=' + input.value);
        let alertpass = document.querySelector('.alertpassword1');
        let alertpass2 = document.querySelector('.alertpassword2');
        let alertpass3 = document.querySelector('.alertTextInput');
        let ok = true;
        let data = await res.json();
        console.log(data);
        if (input.value.length > 0 && input2.value.length > 0 && input3.value.length > 0) {
            input3.style.borderBottom = '2px solid #9112BC';
            ok = true;

            alertpass3.innerHTML = '';
            if (data.same) {
                alertpass.innerHTML = 'این رمز تکراری است'
                ok = false;
            } else {
                input.style.borderBottom = '2px solid #9112BC';
                alertpass.innerHTML = ''

            }
            if (input.value !== input2.value) {
                input2.style.borderBottom = '2px solid red';
                alertpass2.innerHTML = 'این رمز با رمز بالا برابر نیست'
                ok = false;
            }
            else {
                input2.style.borderBottom = '2px solid #9112BC';
                alertpass2.innerHTML = ''

            }
        } else {
            input3.style.borderBottom = '2px solid red';
            alertpass3.innerHTML = 'یکی از ورودی ها خالی است';
            ok = false;
        }
        if(ok){
            let result = await fetch(`http://127.0.0.1:5000/api-login?username=کاربر جدید&password=${input2.value}&email=none&public_name=${input3.value}`);
            console.log(result);
            
        }



    }
    return (
        <FormLogin action="" className="login" onSubmit={() => { SubmitHandler() }}>
            <h1>{name}</h1>
            <FormAuthSignUpItem ItemName='نام کاربری' InputType='text' IDNAME='TextInput' />
            <FormAuthSignUpItem ItemName='رمز عبور' InputType='password' IDNAME='password1' />
            <FormAuthSignUpItem ItemName='تکرار رمز عبور' InputType='password' IDNAME='password2' />
            <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" disabled={!dt.ActiveForm} />
        </FormLogin>
    )
}

export default FormAuthSignIn;