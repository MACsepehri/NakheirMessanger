import { ItemDiv, InputItem,DivInput } from '../../styled_components/StyledLoginPage'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import withReactContent from 'sweetalert2-react-content'
let FormAuthItem = ({ ItemName, InputType, IDNAME ,PlaceHolder}) => {
    return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
            <DivInput>
            {IDNAME=='TextInput'?<FontAwesomeIcon icon={faUser} />:<FontAwesomeIcon icon={faLock} />}
            <InputItem id={IDNAME} type={`${InputType}`} placeholder={PlaceHolder} />
            </DivInput>

            <h6 className={`alert${IDNAME}`}></h6>

        </ItemDiv>
    )
}

export default FormAuthItem;