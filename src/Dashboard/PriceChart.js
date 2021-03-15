import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries, Caption
} from 'react-jsx-highcharts';
import highchartsConfig from './HighchartsConfig'
import {Tile} from "../Shared/Tile";
import { AppContext } from '../App/AppProvider'
import HighchartsReact from 'highcharts-react-official'
import HighchartsTheme from './HighchartsTheme'
import ChartSelect from './ChartSelect';


export default function() {
    return(

        <AppContext.Consumer>
            {({historical, changeChartSelect}) =>
                <Tile>
                    <ChartSelect
                        defaultValue="months"
                        onChange={e => changeChartSelect(e.target.value)}
                    >
                        <option value='days'> Days </option>
                        <option value='weeks'> Weeks </option>
                        <option value='months'> Months </option>
                    </ChartSelect>
                    { historical ?
                        <HighchartsReact
                        highcharts={Highcharts}
                        options={highchartsConfig(historical)}
                    /> : <div> Loading Historical Data ... </div>
                    }

                </Tile>
            }
        </AppContext.Consumer>
    )
}
