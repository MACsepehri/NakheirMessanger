import { styled } from "styled-components";

export let LeftMainPart = styled.div`
width:20%;
height:100%;
border-radius:30px;
background-color: #0d0d1f5b ;
border:2px solid #313164;
display:flex;
flex-direction:column;
position:relative;
padding-top:2%;
transition:all 600ms ease;
&:hover{
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

export let Avatar = styled.div
    `
display:flex;
position:relative;
align-items:center;
justify-content:center;
border-radius:100%;
::before{
content:'';
position: absolute;
display:block;
width:20px;
height:20px;
background-color: lightgreen;
right:10%;
z-index:100;
bottom:5%;
border-radius:100%;
}

`



export let Img_avatar = styled.img
    `
width:75px;
border-radius:100%;
position:relative;
`

export let  ItemHandlerDiv = styled.div
`
width:100%;
display:flex;
align-items:center;
justify-content:center;
gap:20px;
flex-direction:column;
padding-top:100px;
`

export let ItemLeft = styled.div
`
height:70px;
width:90%;
background-color:transparent ;
border-radius:15px;
display:flex;
align-items:center;
justify-content: flex-end;
padding-right:30px;
gap:30px;
cursor:pointer;
&:hover{
background-color:#14143b;
}
`

export let LastLeftItem = styled.div
`
height:150px;
width:90%;
position:absolute;
bottom:5%;
background-color:rgba(178, 28, 242, .2);
border-radius:20px;
right:5%;
display:flex;
gap:2%;
align-items:center;
`

export let LastMatnLeft = styled.div
`
height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:60%;
font-size:15px;
gap:20px;
direction:rtl;
`

export let ImgLeftLast = styled.img
`
width:100px;
border-radius:100%;

`

