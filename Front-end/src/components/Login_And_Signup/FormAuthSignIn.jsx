import { FormLogin, InputSubmit } from '../../styled_components/StyledLoginPage'
import FormAuthSignUpItem from './FormAuthSignUpItem'
let FormAuthSignIn = ({name}) => {
    return (
        <FormLogin action="" className="login">
            <h1>{name}</h1>
            <FormAuthSignUpItem ItemName='نام کاربری' InputType='text' />
            <FormAuthSignUpItem ItemName='رمز عبور' InputType='password' />
            <FormAuthSignUpItem ItemName='تکرار رمز عبور' InputType='password' />
            <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" />
        </FormLogin>
    )
}

export default FormAuthSignIn;