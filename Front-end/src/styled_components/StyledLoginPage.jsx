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
  height: 50px;
  text-align:right;
  padding-right:13%;
  background: #171625 !important;
  color: white !important;
  border: 2px solid #262537;
  border-radius:10px;
  outline: none;
  font-size:20px;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: #ffffff !important;
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-background-clip: text !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;


export let FormLogin = styled.form
    `
    padding-top:1%;
    width:500px;
    min-height:700px;
    background-color: #11111F;
    border:2px solid #39314F;
    border-radius:40px;
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

export let DivInput = styled.div
    `
    width:100%;
    display:flex;
    align-items:center;
    position:relative;
    justify-content:center;
`