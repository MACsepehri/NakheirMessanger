import { useContext, useEffect, useState } from 'react';
import { ItemDiv, InputItem } from '../../styled_components/StyledLoginPage'
import { MessengerContext } from '../../Context/MessengerContext';

let FormAuthSignUpItem = ({ ItemName, InputType, IDNAME }) => {
    let data = useContext(MessengerContext);
    let users = []
    let CheckInput = () => {
        if (InputType == 'text') {
            let input = document.querySelector('.TextInput');
            let alertElement = document.querySelector('.alertTextInput');
            let found = false;
            users.forEach(i => {
                if (i.public_name == input.value) {
                    found = true;
                }
            })
            if (found) {
                input.style.borderBottom = '2px solid red';
                alertElement.innerHTML = 'این نام کاربری وجود دارد';
                data.ChangeFormActiveStatus(false)
            } else {
                input.style.borderBottom = '2px solid #9112BC';
                alertElement.innerHTML = '';
                data.ChangeFormActiveStatus(true)

            }
        }
    }
    useEffect(() => {
        fetch('http://127.0.0.1:5000/main-login-checker')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                users = data.users;
                console.log(users)
            })
    }, [users])
    return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
            <InputItem className={`${InputType == 'text' ? 'TextInput' : 'PasswordInput'}`} id={IDNAME} type={`${InputType}`} onChange={() => { CheckInput() }} required />
            <h6 className={`alert${IDNAME}`}></h6>
        </ItemDiv>
    )
}

export default FormAuthSignUpItem;