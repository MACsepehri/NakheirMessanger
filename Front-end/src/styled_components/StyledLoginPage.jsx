import { styled } from 'styled-components';

export let ItemDiv = styled.div
    `
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
    `
export let InputItem = styled.input
    `
    width:80%;
    height:35px;
    background: transparent;
    text-align:center;
    border:0;
    border-bottom : 2px solid #680a87;
    outline:none;
    &:hover{
    border-bottom : 2px solid #9112BC;
    }
    &:focus{
        border-bottom : 2px solid #9112BC;
    }
    `

export let FormLogin = styled.form
    `
    padding-top:1%;
    width:400px;
    min-height:500px;
    background-color: #282828;
    border-radius:40px;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:40px;
    &:hover{
    transform:translateY(-1%);
    }
    `


export let InputSubmit = styled.input
    `
    width:150px;
    height:40px;
    border-radius:10px;
    background-color: #9112BC;
    border:none;
    box-shadow:0px 0px 10px #9112BC;
    cursor:pointer;
    &:hover{
    transform:scale(1.1);
    }
    `