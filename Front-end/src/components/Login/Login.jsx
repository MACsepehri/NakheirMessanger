import { FormLogin, InputSubmit } from '../../styled_components/StyledLoginPage'
import LoginItem from './LoginItem'
let Login = () => {
    return (
        <FormLogin action="" className="login">
            <h1>ورود</h1>
            <LoginItem ItemName='نام کاربری' InputType='text' />
            <LoginItem ItemName='رمز عبور' InputType='password' />
            <LoginItem ItemName='تکرار رمز عبور' InputType='password' />

            {/* <ItemDiv className="item">
                <p>نام کاربری</p>
                <InputItem type="text" />
            </ItemDiv>
            <ItemDiv className="item">
                <p>رمز عبور</p>
                <InputItem type="password" />
            </ItemDiv>
            <ItemDiv className="item">
                <p>تکرار رمز عبور</p>
                <InputItem type="password" />
            </ItemDiv> */}
            <InputSubmit type="submit" value="ثبت اطلاعات" className="sub" />
        </FormLogin>
    )
}

export default Login;