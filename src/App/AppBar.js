import React from "react"
import styled, {css} from "styled-components"
import {AppContext} from "./AppProvider"

const Logo = styled.div`
font-size: 1.5em;
`

const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props => props.active && css`
    //text-shadow: 0 0  20px #89fc00;
    text-shadow: 0 0  30px #03ff03;
    `}
    ${props => props.hidden && css`
      display: none;
`}
  `

//  Function to Capitalize first letter
const toProperCase = (lower) => {
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

const ControlButton = ({name, active}) => {
    return(
        <AppContext.Consumer>
            {({firstVisit, page, setPage}) => (
            <ControlButtonElem
                active={page===name}
                onClick={()=> setPage(name)}
                hidden={firstVisit && page === 'dashboard'}
            >
                {toProperCase(name)}
            </ControlButtonElem>
                )}
        </AppContext.Consumer>
    )
}

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
  margin-bottom: 40px;
`

const AppBar = () => {
    return(
        <Bar>
            <Logo>CryptoXchange </Logo>
            <div/>
            <ControlButton active name={"dashboard"}/>
            <ControlButton name={"settings"}/>
        </Bar>
    )
}

export default AppBar;
