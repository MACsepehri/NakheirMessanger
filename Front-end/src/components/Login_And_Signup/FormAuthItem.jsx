import { ItemDiv, InputItem } from '../../styled_components/StyledLoginPage'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon,DivInput } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import withReactContent from 'sweetalert2-react-content'
let FormAuthItem = ({ ItemName, InputType, IDNAME }) => {
    return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
            <FontAwesomeIcon icon={faUser} />
            <InputItem id={IDNAME} type={`${InputType}`} />
            <h6 className={`alert${IDNAME}`}></h6>

        </ItemDiv>
    )
}

export default FormAuthItem;