import { useContext, useEffect, useState } from 'react';
import { MessengerContext } from '../../Context/MessengerContext';
import { ItemDiv, InputItem,DivInput } from '../../styled_components/StyledLoginPage'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

let FormAuthSignUpItem = ({ ItemName, InputType, IDNAME,PlaceHolder }) => {
      return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
	    <DivInput>
            {IDNAME=='TextInput' || IDNAME == 'NameInput'   ? <FontAwesomeIcon icon={faUser} />:<FontAwesomeIcon icon={faLock} />}
            <InputItem className={`${InputType == 'text'  ? 'TextInput' : 'PasswordInput'}`} id={IDNAME} type={`${InputType}`} placeholder={PlaceHolder} required />
	    </DivInput>
            <h6 className={`alert${IDNAME}`}></h6>
        </ItemDiv>
    )
}

export default FormAuthSignUpItem;
