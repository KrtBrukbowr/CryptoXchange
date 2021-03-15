import React from 'react'
import styled from 'styled-components'
import { fontSize2 } from '../Shared/Styles'
import { AppContext } from '../App/AppProvider'
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    
`

const SearchInput = styled.input`
      background-color: #010e2c;
      border: none;
      border-radius: 5px;
      padding: 10px;
      box-shadow:  inset -3px -3px 2px #061a44,  inset 3px 3px  2px #020612;
      ${fontSize2};
      color: #1163c9;    
      height: 25px;
      place-self: center left;
      &:hover {
      box-shadow:  -10px -10px 20px #061a44,  10px 10px  20px #020612;
      }
      &:focus {
      //border: red 5px solid;
      outline: none;
      box-shadow:  -3px -3px 2px #061a44,  3px 3px  2px #020612;
      }
`

const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
    // Get all the coin symbols
    let coinSymbols = Object.keys(coinList);
    // Get all the coin names , map symbol to name
    let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)
    let allStringsToSearch = coinSymbols.concat(coinNames);
    let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch,{})
        .map(result => result.string)
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;
        return(_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
    })
    console.log(filteredCoins);
    setFilterCoins(filteredCoins)
}, 500);

const filterCoins = (e, setFilteredCoins, coinList)=> {
    let inputValue = e.target.value
    if(!inputValue){
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins)
}

const Search = ()=> {
    return (
        <AppContext.Consumer>
            {({setFilteredCoins, coinList}) =>
                <SearchGrid>
                    <h2>Search all coins</h2>
                    <SearchInput onKeyUp={ (e)=> filterCoins(e, setFilteredCoins, coinList)}
                    />
                </SearchGrid>
            }
        </AppContext.Consumer>
    )
}

export default Search;


/*
export default function () {
    return(
        <div> Search </div>
    )
}
*
* */


