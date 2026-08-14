import {ItemDiv,InputItem} from '../../styled_components/StyledLoginPage'

let LoginItem = ({ ItemName, InputType }) => {
    return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
            <InputItem type={`${InputType}`} />
        </ItemDiv>
    )
}

export default LoginItem;