import {styled} from "styled-components";

export let LeftMainPart = styled.div`
width:20%;
height:100%;
border-radius:30px;
background-color: #0d0d1f5b ;
border:2px solid #313164;
display:flex;
flex-direction:column;
padding-top:2%;
transition:all 600ms ease;
&:hover{
transform:translateY(-1%);
border:2px solid #3d335f;
}
`

export let CenterMainPart = styled.div`
width:50%;
height:100%;
border-radius:30px;
background-color: #0d0d1f5b ;
border:2px solid #313164;
transition:all 600ms ease;

&:hover{
transform:translateY(-1%);
border:2px solid #3d335f;
}
`


export let RightMainPart = styled.div`
width:30%;
height:100%;
border-radius:30px;
background-color: #0d0d1f5b ;
backdrop-filter:blur(100px);
border:2px solid #313164;
transition:all 600ms ease;

&:hover{
transform:translateY(-1%);
border:2px solid #3d335f;
}
`

export let Div_Img = styled.div
`
width:100%;
display:flex;
align-items : center;
justify-content:flex-start;
padding-left:10%;
gap:3%;
`

export let Img_avatar = styled.img
`
width:50px;
border-radius:100%;
`