import { ItemDiv, InputItem } from '../../styled_components/StyledLoginPage'

let FormAuthItem = ({ ItemName, InputType, IDNAME }) => {
    return (
        <ItemDiv className="item">
            <p>{ItemName}</p>
            <InputItem id={IDNAME} type={`${InputType}`} />
            <h6 className={`alert${IDNAME}`}></h6>

        </ItemDiv>
    )
}

export default FormAuthItem;