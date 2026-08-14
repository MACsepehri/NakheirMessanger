import {ItemDiv,InputItem} from '../../styled_components/StyledLoginPage'

let FormAuthItem = ({ ItemName, InputType }) => {
    return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
            <InputItem type={`${InputType}`} />
        </ItemDiv>
    )
}

export default FormAuthItem;