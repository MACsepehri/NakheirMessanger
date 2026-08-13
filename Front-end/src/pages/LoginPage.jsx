import '../css/Main.css'

export default function LoginPage() {
    return (
        <>
            <div className="container">
                <form action="" className="login">
                    <h1>ورود</h1>
                    <div className="item">
                        <p>نام کاربری</p>
                        <input type="text" />
                    </div>
                    <div className="item">
                        <p>رمز عبور</p>
                        <input type="password" />
                    </div>
                    <div className="item">
                        <p>تکرار رمز عبور</p>
                        <input type="password" />
                    </div>
                    <input type="submit" value="ثبت اطلاعات" className="sub" />
                </form>
            </div>
        </>
    )
}