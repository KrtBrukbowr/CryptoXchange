import styled from 'styled-components'
import {subtleBoxShadow, lightBlueBackground, greenBoxShadow, redBoxShadow} from "./Styles"

export const Tile = styled.div`
 /*
 
  ${subtleBoxShadow}
  ${lightBlueBackground}
  
  */
  border-radius: 5px;
  padding: 10px;
  box-shadow:  -3px -3px 2px #061a44,  3px 3px  2px #020612;
  //background-color: #061a44;
  
  &:hover {
  cursor: pointer;
  ${greenBoxShadow};
   box-shadow:  -10px -10px 20px #061a44,  10px 10px  20px #020612;
   
  }
`

export const SelectableTile = styled(Tile)`
  &:hover {
  cursor: pointer;
  box-shadow:  -10px -10px 20px #061a44,  10px 10px  20px #020612;
/*  ${greenBoxShadow}*/
  }
`
export const DeletableTile = styled(SelectableTile)`
&:hover{
cursor: pointer;
/* ${redBoxShadow};*/
box-shadow: inset -2px -2px 6px #061a44, inset 2px 2px  6px #0206122
}
`

export const DisabledTile = styled(Tile)`
pointer-events: none;
opacity: 0.4;
`

/*
background-color: #010e2c;
Light Shadow: #2B364F 0e2b81
Dark Shadow: #00050F 020612

*/
