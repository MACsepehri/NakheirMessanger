import { useContext } from 'react'
import { FormLogin, InputSubmit,TitleDiv,InputHandelDiv,ImgLogoInput} from '../../styled_components/StyledLoginPage'
import FormAuthItem from './FormAuthItem'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import { MessengerContext } from '../../Context/MessengerContext'

let FormAuth = ({ name,des }) => {
    let getCont = useContext(MessengerContext);

    let SubmitLoginHandler = () => {
        event.preventDefault();
        let ok = true;

        let input_name = document.querySelector('input#TextInput');
        let input_pass1 = document.querySelector('input#PasswordInput1');

        let alert_name = document.querySelector('h6.alertTextInput');
        let alert_pass1 = document.querySelector('h6.alertPasswordInput1');

        if (input_name.value == 0 || input_pass1.value == 0 ) {
            input_name.style.borderBottom = '2px solid red';
            alert_name.innerHTML = 'یکی از ورودی ها خالی هست';
            ok = false;
        } else {
            input_name.style.borderBottom = '2px solid #262537';
            alert_name.innerHTML = '';
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
                        sessionStorage.setItem('user', `{"name":"${data.user.username}","public_name":"${data.user.public_name}"}`);
                        Swal.fire({
                            title: 'عملیات با موفقیت انجام شد',
                            html: '<a href="/" style="color: #006fed; text-decoration: none;">رفتن به صفحه اصلی</a>',
                            icon: "success"
                        });
                    }

                })
        }
    }

    return (
        <FormLogin action="" className="login" onSubmit={() => { SubmitLoginHandler() }}>
            <TitleDiv>
	   <ImgLogoInput src='/src/assets/1787474457 (Edited)-no-bg.png'/>
             <h1>{name}</h1>
            <p>{des}</p>
            </TitleDiv>
            <InputHandelDiv>
            <FormAuthItem ItemName='نام کاربری' InputType='text' IDNAME='TextInput' PlaceHolder='نام کاربری خود را وارد کنید'/>
            <FormAuthItem ItemName='رمز عبور' InputType='password' IDNAME='PasswordInput1' PlaceHolder='رمز عبور خود را وارد کنید'/>
            </InputHandelDiv>

            <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" />
            <p class='LinkP'> حساب کاربری ندارید؟ <Link to='/signup' class='linkA'>ثبت نام کنید</Link></p>
        </FormLogin>
    )
}

export default FormAuth;
