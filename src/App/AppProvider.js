import React from "react"
import _ from 'lodash';
import Moment from 'react-moment';
import moment from 'moment';

const cc = require('cryptocompare');
cc.setApiKey('0d8488fb20327ace7aa258dba908247e6d5ebd9f5e5adec861c03cf1f248be3f')

export const AppContext = React.createContext();

const MAX_FAVORITES = 10
const TIME_UNITS = 10;

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            timeInterval: 'months',
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite,
            changeChartSelect: this.changeChartSelect,

        }
    }

    componentDidMount = ()=> {
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList})
        console.log(coinList);
}

fetchPrices = async ()=> {
        if(this.state.firstVisit) return;
        let prices = await this.prices();
        prices = prices.filter(price => Object.keys(price).length);
        this.setState({prices});
        console.log(prices);
}

fetchHistorical = async ()=> {
        if(this.state.firstVisit) return;
        let results = await this.historical();
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(),
                    ticker.USD
                ])
            }
        ];
        this.setState({historical});
}

prices = async ()=> {
        let returnData = [];
        for(let i = 0; i< this.state.favorites.length; i++) {
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD')
                returnData.push(priceData);
            } catch (e) {
                console.warn('Fetch price error: ', e)
            }
        }
        return returnData;
}

addCoin = (key) => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({favorites})
        }
}

historical = ()=> {
        let promises = [];
        for(let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ['USD'],
                    moment()
                        .subtract({[this.state.timeInterval]: units})
                        .toDate()

                )
            )
        }
        return Promise.all(promises);
}

removeCoin = (key) => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)})
}

isInFavorites = key => _.includes(this.state.favorites, key)


    confirmFavorites = () => {
        let  currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
            prices: null,
            historical: null
        }, ()=> {
            this.fetchPrices();
            this.fetchHistorical();
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite,
        }));
        // console.log("Hello, You've confirmed Favorites !!!")
    }

    setCurrentFavorite = (sym)=> {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical);
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: sym
        }))
    }
    
    savedSettings(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData){
            return {page: 'settings', firstVisit: true}
        }
        let {favorites, currentFavorite} = cryptoDashData;
        return{favorites, currentFavorite}
    }

    setPage = page => this.setState({page})

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    changeChartSelect = (value) => {
        this.setState({timeInterval: value, historical: null}, this.fetchHistorical);
        console.log(value);
    }

    render(){
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
