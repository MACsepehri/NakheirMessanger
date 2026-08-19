import { useContext } from 'react'
import { FormLogin, InputSubmit } from '../../styled_components/StyledLoginPage'
import FormAuthItem from './FormAuthItem'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { MessengerContext } from '../../Context/MessengerContext'

let FormAuth = ({ name }) => {
    let getCont = useContext(MessengerContext);
    let SubmitLoginHandler = () => {
        event.preventDefault();
        let ok = true;

        let input_name = document.querySelector('input#TextInput');
        let input_pass1 = document.querySelector('input#PasswordInput1');
        let input_pass2 = document.querySelector('input#PasswordInput2');

        let alert_name = document.querySelector('h6.alertTextInput');
        let alert_pass1 = document.querySelector('h6.alertPasswordInput1');
        let alert_pass2 = document.querySelector('h6.alertPasswordInput2');

        if (input_name.value == 0 || input_pass1.value == 0 || input_pass2.value == 0) {
            input_name.style.borderBottom = '2px solid red';
            alert_name.innerHTML = 'یکی از ورودی ها خالی هست';
            ok = false;
        } else {
            input_name.style.borderBottom = '2px solid #9112BC';
            alert_name.innerHTML = '';
        }

        if (input_pass1.value != input_pass2.value) {
            input_pass2.style.borderBottom = '2px solid red';
            alert_pass2.innerHTML = 'دو رمز عبور باهم برابر نیستند';
            ok = false;
        } else {
            input_pass2.style.borderBottom = '2px solid #9112BC';
            alert_pass2.innerHTML = '';
        }
        if (ok) {
            fetch(`http://127.0.0.1:5000/login?password=${input_pass1.value}&public_name=${input_name.value}`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data);
                    if (data.success == false) {
                        Swal.fire({
                            title: data.error,
                            icon: "error"
                        });
                        getCont.ChnageActiveForm(false);
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                        getCont.ChnageActiveForm(true);
                        Swal.fire({
                            title: 'عملیات با موفقیت انجام شد',
                            html:'<a href="/" style="color: #006fed; text-decoration: none;">رفتن به صفحه اصلی</a>',
                            icon: "success"
                        });
                    }

                })
        }
    }

    return (
        <FormLogin action="" className="login" onSubmit={() => { SubmitLoginHandler() }}>
            <h1>{name}</h1>
            <FormAuthItem ItemName='نام کاربری' InputType='text' IDNAME='TextInput' />
            <FormAuthItem ItemName='رمز عبور' InputType='password' IDNAME='PasswordInput1' />
            <FormAuthItem ItemName='تکرار رمز عبور' InputType='password' IDNAME='PasswordInput2' />
            <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" />
        </FormLogin>
    )
}

export default FormAuth;