import styled from "styled-components";

 const Basebutton = styled.button`
  
    border: 0;
    padding: 10px 35px;
   
    transition: 0.4s;
    border-radius: 50px;
    cursor :pointer
`
export const primary = styled(Basebutton)`
background:  ${props =>props.disabled ? 'gray' : '#FF6337'};
color: #fff;
&:hover{
    background:  ${props =>props.disabled ? 'gray' : 'blue'};
}
margin-left: 40%;
`

export const secondry = styled(Basebutton)`
background: ${props =>props.disabled ? 'gray' : ' #000'};
color: white;
&:hover{
    background: ${props =>props.disabled ? 'gray' : 'blue'};
}
`

export const outline = styled(Basebutton)`
background: gray;
border: 2px solid black;
color: #000;
&:hover{
    background: blue;
}
`