import FormAuth from '../components/Login_And_Signup/FormAuth'
import '../css/Main.css'

export function LoginPage() {

    return (
        <>
            <div className="container">
                <FormAuth name='ورود'/>
            </div>
        </>
    )
}