import React from 'react'
import styled from 'styled-components'
import {AppContext} from "../App/AppProvider"
import CoinTile from './CoinTile'
import {SelectableTile} from '../Shared/Tile'

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(150px, 1fr));
    grid-gap: 35px;  
    margin-top: 40px;
`

function getLowerSectionCoins(coinList, filteredCoins){
    return filteredCoins && Object.keys(filteredCoins) ||
        Object.keys(coinList).slice(0,100)
}

function getCoinsToDisplay(coinList, topSection, favorites, filterCoins){
    return topSection ? favorites : getLowerSectionCoins(coinList, filterCoins);
}

export default function ({topSection}) {
    return(
        <AppContext.Consumer>
            {({coinList, favorites, filteredCoins}) => (
                <CoinGridStyled>
                {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey =>
                // <SelectableTile> {coinKey} </SelectableTile>
                    <CoinTile
                        key={coinKey}
                        topSection={topSection}
                        coinKey={coinKey}
                    />
                )}
                </CoinGridStyled>
            )}
        </AppContext.Consumer>
    )
}

