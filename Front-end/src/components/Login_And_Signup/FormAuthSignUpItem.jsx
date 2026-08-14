import { useEffect, useState } from 'react';
import {ItemDiv,InputItem} from '../../styled_components/StyledLoginPage'

let FormAuthSignUpItem = ({ ItemName, InputType }) => {
    let users = []
    let CheckInput = () => {
        if(InputType=='text'){
            let input = document.querySelector('.TextInput');
            users.forEach(i => {                
                if(i.public_name == input.value){
                    console.log(input.style);
                    
                    input.style.borderBottom = '2px solid red'
                    document.querySelector('.alert').innerHTML = 'این نام کاربری وجود دارد'
                }
                else{
                                        input.style.borderBottom = '2px solid #9112BC'
                    document.querySelector('.alert').innerHTML = ''
                }
            })            
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
            <InputItem className={`${InputType=='text'?'TextInput':'PasswordInput'}`} type={`${InputType}`} onChange={() => {CheckInput()}} />
            <h6 className="alert"></h6>
        </ItemDiv>
    )
}

export default FormAuthSignUpItem;