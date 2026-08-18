import { useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import { MessengerContext } from "../Context/MessengerContext";
let MainPage = () => {
    const navigate = useNavigate();
    let login = false;

    useEffect(() => {
        const storedName = sessionStorage.getItem('user');
        if (!storedName) {
            navigate('/login')
        }else{
            console.log(storedName);
            
        }
    }, [login, navigate])

    return <h1>hello</h1>
}

export default MainPage;