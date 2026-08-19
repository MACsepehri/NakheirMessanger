import { useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import { MessengerContext } from "../Context/MessengerContext";
import Main from "../components/MainPage/Main";
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

    return (<Main/>)
}

export default MainPage;