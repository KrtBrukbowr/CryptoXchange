import React from "react";
import {AppContext} from "../App/AppProvider"


const Welcome = ()=> {
    return (
        <AppContext.Consumer>
            {({firstVisit}) =>
                  firstVisit ? <div>
                Welcome to CryptoXchange the #1 digital currency dashboard on the web. Please select your favorite coins to begin.{' '}
            </div> : null
            }
        </AppContext.Consumer>
    )
}

export default Welcome;
