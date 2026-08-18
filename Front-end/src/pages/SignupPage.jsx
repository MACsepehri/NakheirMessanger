import { useNavigate } from 'react-router-dom';
import FormAuthSignIn from '../components/Login_And_Signup/FormAuthSignIn';
import { FormLogin, InputItem, InputSubmit, ItemDiv } from '../styled_components/StyledLoginPage'
import { styled } from 'styled-components';
import { useEffect } from 'react';


export let SignUpPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const storedName = sessionStorage.getItem('user');
        if (storedName) {
            navigate('/');
        }
    }, [navigate])
    return (
        <div className="container">
            <FormAuthSignIn name='ثبت نام' />
        </div>
    )
}