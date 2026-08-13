import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {styled} from 'styled-components';
let MainPage = () => {
    const navigate = useNavigate();
    let login = false;
    useEffect(() => {
        if (!login) {
            navigate('/login')
        }
    }, [login, navigate])

    return <h1>hello</h1>
}

export default MainPage;