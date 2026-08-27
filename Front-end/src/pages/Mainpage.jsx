import { Suspense, useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import { MessengerContext } from "../Context/MessengerContext";
import { lazy } from "react";

const Main = lazy(() => {
    return import('../components/MainPage/Main');
});

let MainPage = () => {
    useEffect(() => {
        document.title = "Nakheir messenger";
    }, []);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Main />
        </Suspense>
    )
}

export default MainPage;