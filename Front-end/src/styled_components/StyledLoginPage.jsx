import { styled } from 'styled-components';

export let ItemDiv = styled.div
    `
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
    `
export let InputItem = styled.input`
  width: 80%;
  height: 35px;
  background: transparent !important;
  text-align: center;
  color: white !important;
  border: 0;
  border-bottom: 2px solid #26268f;
  outline: none;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: white !important;
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    transition: background-color 5000s ease-in-out 0s;
    
  }
  &:hover {
    border-bottom: 2px solid #26268f;
  }
  &:focus {
    border-bottom: 2px solid #26268f;
  }
`;


export let FormLogin = styled.form
    `
    padding-top:1%;
    width:400px;
    min-height:500px;
    background-color: #0d0d1f5b;
    border:2px solid #26268f;
    border-radius:60px;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:40px;
    &:hover{
    padding-bottom:10px ;
    }
    `   


export let FormLogin2 = styled.form
    `
    padding-top:1%;
    width:450px;
    min-height:600px;
    background-color: #282828;
    border-radius:40px;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:40px;
    padding-bottom:20px ;
    `



export let InputSubmit = styled.input
    `
    width:150px;
    height:40px;
    border-radius:10px;
    background-color: #313164;
    border:none;
    box-shadow:0px 0px 10px #313164;
    cursor:pointer;
    &:hover{
    transform:scale(1.1);
    }
    `