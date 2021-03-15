import React from "react"
import Page from "../Shared/Page"
import Welcome from "./WelcomeMessage"
import ConfirmButton from './ConfirmButton';
import CoinGrid from './CoinGrid'
import Search from './Search';

export default function(){
    return (
        <Page name="settings">
            <Welcome/>
            <CoinGrid topSection />
            <ConfirmButton/>
            <Search/>
            <CoinGrid/>
        </Page>
    )
}
