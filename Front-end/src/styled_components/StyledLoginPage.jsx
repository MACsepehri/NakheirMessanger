import { styled } from 'styled-components';

export let ItemDiv = styled.div
    `
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    gap:10px;
    width:80%;
    `
export let InputItem = styled.input`
  width: 100%;
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
    color:white;
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-background-clip: text !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;


export let FormLogin = styled.form
    `
    width:500px;
    min-height:700px;
    background-color: #11111F;
    border:2px solid #39314F;
    border-radius:40px;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:40px;
    padding-bottom:10px;
    `


export let FormLogin2 = styled.form
    `
    width:500px;
    min-height:700px;
    background-color: #11111F;
    border:2px solid #39314F;
    border-radius:40px;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:40px;
    padding-bottom:10px;   `



export let InputSubmit = styled.input
    `
    width:80%;
    height:40px;
    border-radius:10px;
    background-color: #651CD6;
    border:none;
    cursor:pointer;
    &:hover{
    transform:translateY(-10%);
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

export let TitleDiv = styled.div
    `
    width:100%;
    height:40%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap:20px;
`

export let InputHandelDiv = styled.div
`
    width:100%;
    height:40%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap:30px;
`

export let ImgLogoInput = styled.img
`
	width:200px;

`

