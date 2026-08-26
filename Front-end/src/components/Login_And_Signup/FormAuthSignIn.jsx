import { useEffect, useContext, use } from 'react'
import { FormLogin, InputSubmit2,TitleDiv2,InputHandelDiv,ImgLogoInput,FormLogin2 ,  PLinkElement } from '../../styled_components/StyledLoginPage'
import FormAuthSignUpItem from './FormAuthSignUpItem'
import { MessengerContext } from '../../Context/MessengerContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link} from 'react-router-dom'

let FormAuthSignIn = ({ name }) => {
    let dt = useContext(MessengerContext);

    let SubmitHandler = async () => {

        event.preventDefault();

        let input = document.getElementById('password1');
        let input2 = document.getElementById('password2');
        let input3 = document.getElementById('TextInput');
        let input4 = document.getElementById('NameInput');


        let res = await fetch('http://127.0.0.1:5000/check-input?password=' + input.value + '&name=' + input3.value);
        let data = await res.json();

        let alertpass = document.querySelector('.alertpassword1');
        let alertpass2 = document.querySelector('.alertpassword2');
        let alertpass3 = document.querySelector('.alertTextInput');

        let ok = true;
        console.log(data);

        if (input.value.length > 0 && input2.value.length > 0 && input3.value.length > 0 && input4.value.length > 0) {
            input3.style.borderBottom = '2px solid #262537';
            ok = true;
            alertpass3.innerHTML = '';


            if (data.pass_same) {
                input.style.borderBottom = '2px solid red';
                alertpass.innerHTML = 'این رمز تکراری است';
                ok = false;
            } else {
                input.style.borderBottom = '2px solid #262537 ';
                alertpass.innerHTML = '';
            }

            if (data.name_same) {
                input3.style.borderBottom = '2px solid red';
                alertpass3.innerHTML = 'این نام کاربری تکراری است';
                ok = false;
            } else {
                input3.style.borderBottom = '2px solid #262537';
                alertpass3.innerHTML = '';
            }


            if (input.value !== input2.value) {
                input2.style.borderBottom = '2px solid red';
                alertpass2.innerHTML = 'این رمز با رمز بالا برابر نیست';
                ok = false;
            }
            else {
                input2.style.borderBottom = '2px solid #262537';
                alertpass2.innerHTML = '';

            }

        } else {
            input3.style.borderBottom = '2px solid red';
            alertpass3.innerHTML = 'یکی از ورودی ها خالی است';
            ok = false;
        }
        if (ok) {

            fetch(`http://127.0.0.1:5000/register?name=${input4.value}&password=${input.value}&public_name=${input3.value}`)
                .then(res => {
                    return res.json()
                })
                .then((dt2) => {
                    console.log(dt2);
                    if (dt2.success) {
                        Swal.fire({
                            title: "اکانت شما با موفقیت ساخته شد",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "مشکلی پیش آمد",
                            icon: "error"
                        });
                    }

                })
        }



    }
    return (
        <FormLogin2 action="" className="login" onSubmit={() => { SubmitHandler() }}>
            <TitleDiv2>
	   <ImgLogoInput src='/src/assets/1787474457 (Edited)-no-bg.png'/>
	    <h1>{name}</h1>
	    </TitleDiv2>
            <FormAuthSignUpItem ItemName='نام کاربری' InputType='text' IDNAME='TextInput' PlaceHolder='نام کاربری خود را وارد کنید' />
            <FormAuthSignUpItem ItemName='نام' InputType='text' IDNAME='NameInput' PlaceHolder='نام خود را وارد کنید' />
            <FormAuthSignUpItem ItemName='رمز عبور' InputType='password' IDNAME='password1' PlaceHolder='رمز عبور خود را وارد کنید' />
            <FormAuthSignUpItem ItemName='تکرار رمز عبور' InputType='password' IDNAME='password2' PlaceHolder='تکرار رمز عبور خود را وارد کنید' />

            <InputSubmit2 type="submit" value="ثبت اطلاعات" className="sub"  />
<p className='LinkP'> حساب کاربری دارید؟ <Link to='/login' className='linkA'>وارد شوید</Link></p>
        </FormLogin2>
    )
}

export default FormAuthSignIn;
