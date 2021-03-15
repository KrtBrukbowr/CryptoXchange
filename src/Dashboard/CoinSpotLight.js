import React from 'react';
import styled from 'styled-components'
import { AppContext } from "../App/AppProvider"
import { Tile } from "../Shared/Tile";
import CoinImage  from "../Shared/CoinImage";


const SpotlightName = styled.h2`
    text-align: center;
`

export default function () {
    return(
        <AppContext.Consumer>
            {({currentFavorite, coinList}) =>
                <Tile>
                    <SpotlightName> {coinList[currentFavorite].CoinName}</SpotlightName>
                    <CoinImage
                        spotlight
                        coin={coinList[currentFavorite]}
                    />
                </Tile>
            }
        </AppContext.Consumer>
    )
}
