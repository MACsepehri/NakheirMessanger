import { useEffect, useState } from 'react';
import {ItemDiv,InputItem} from '../../styled_components/StyledLoginPage'

let FormAuthSignUpItem = ({ ItemName, InputType }) => {
    let users = []
    let CheckInput = () => {
        if(InputType=='text'){
            let inputVal = document.querySelector('.TextInput').value;
            console.log(users);
            
        }
    }
    useEffect(() => {
        fetch('http://127.0.0.1:5000/main-login-checker')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            users = data.users;
        })
    },[users])
    return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
            <InputItem className={`${InputType=='text'?'TextInput':'PasswordInput'}`} type={`${InputType}`} onKeyDown={() => {CheckInput()}} />
        </ItemDiv>
    )
}

export default FormAuthSignUpItem;