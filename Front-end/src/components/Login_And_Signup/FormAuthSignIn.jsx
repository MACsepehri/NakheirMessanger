import { FormLogin, InputSubmit } from '../../styled_components/StyledLoginPage'
import FormAuthItem from './FormAuthItem'
let FormAuthSignIn = ({name}) => {
    return (
        <FormLogin action="" className="login">
            <h1>{name}</h1>
            <FormAuthItem ItemName='نام کاربری' InputType='text' />
            <FormAuthItem ItemName='رمز عبور' InputType='password' />
            <FormAuthItem ItemName='تکرار رمز عبور' InputType='password' />
            <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" />
        </FormLogin>
    )
}

export default FormAuthSignIn;