import { useContext, useEffect, useState } from 'react';
import { ItemDiv, InputItem } from '../../styled_components/StyledLoginPage'
import { MessengerContext } from '../../Context/MessengerContext';

let FormAuthSignUpItem = ({ ItemName, InputType, IDNAME }) => {
      return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
            <InputItem className={`${InputType == 'text' ? 'TextInput' : 'PasswordInput'}`} id={IDNAME} type={`${InputType}`} required />
            <h6 className={`alert${IDNAME}`}></h6>
        </ItemDiv>
    )
}

export default FormAuthSignUpItem;