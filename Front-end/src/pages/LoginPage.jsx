import { useNavigate } from 'react-router-dom';
import FormAuth from '../components/Login_And_Signup/FormAuth'
import '../css/Main.css'
import { useEffect } from 'react';

export function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const storedName = sessionStorage.getItem('user');
        if (storedName) {
            navigate('/');
        }
    }, [navigate])
    return (
        <>
            <div className="container">
                <FormAuth name='ورود' />
            </div>
        </>
    )
}