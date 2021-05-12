import React, {Component} from 'react';
import {Dimensions, BackHandler, ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import ChartView from 'react-native-highcharts';
import {getDailyStocksAction} from '../Redux/stocksAction';
import {
  RANGE_SELECTOR_BUTTONS,
  STOCK_TYPES,
  STOCKS_CONSTANTS,
} from '../utils/constants';
import {isValidElement} from '../../../MyApp/Utils/helpers';
import {constructData} from '../utils/helpers';
import Speech from '../../VoiceModule/View/Voice';
import {VOICE_OUTPUTS} from '../../VoiceModule/Utils/Constants';
import {StockStyles} from './styles/stockStyles';

class StocksChats extends Component {
  state = {
    dailyCharts: [],
    dailyDates: [],
    speechResult: 4,
  };

  static getDerivedStateFromProps(props, state) {
    if (isValidElement(props.dailyStockData)) {
      return {
        ...state,
        dailyDates: [...Object.keys(props.dailyStockData)],
        dailyCharts: [...Object.values(props.dailyStockData)],
      };
    }
  }

  componentDidMount() {
    this.fetchAPI();
    this.backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });
  }

  componentWillUnmount() {
    this.backhandler.remove();
  }

  fetchAPI() {
    this.props.getDailyStocksAction(
      STOCKS_CONSTANTS.API_KEY,
      STOCKS_CONSTANTS.STOCK_NAME,
      STOCKS_CONSTANTS.DAILY_DATA,
      STOCKS_CONSTANTS.SHOW_FULL,
    );
  }

  render() {
    const openStocks = constructData(
      this.state.dailyCharts,
      this.state.dailyDates,
      STOCK_TYPES.OPEN,
    );
    const highStocks = constructData(
      this.state.dailyCharts,
      this.state.dailyDates,
      STOCK_TYPES.HIGH,
    );
    const Highcharts = 'Highcharts';
    const config = {
      chart: {
        type: 'spline',
        animation: Highcharts.svg,
        marginHorizontal: 5,
        marginVertical: 5,
      },

      rangeSelector: {
        inputEnabled: true,
        allButtonsEnabled: true,
        buttons: RANGE_SELECTOR_BUTTONS,
        selected: this.state.speechResult,
      },
      title: {
        text: 'IBM STOCKS',
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
      },
      yAxis: {
        title: {
          text: 'Value',
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: 'red',
          },
        ],
      },
      exporting: {
        enabled: false,
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          name: 'Open Stocks ',
          data: openStocks,
          tooltip: {
            valueDecimals: 1,
          },
        },
        {
          name: 'High Stocks',
          data: highStocks,
          tooltip: {
            valueDecimals: 1,
          },
        },
      ],
    };
    const options = {};
    return (
      <ScrollView style={StockStyles.colorBackground}>
        <ChartView
          stock={true}
          style={{height: Dimensions.get('window').height / 1.3}}
          config={config}
          options={options}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        <View style={StockStyles.centerAlignment}>
          <Speech
            speech={this.state.speechResult}
            speechResult={value => {
              this.setState({
                speechResult: value,
              });
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  dailyStockData: state.stocksReducer.dailyStockData,
  monthlyStockData: state.stocksReducer.monthlyStockData,
});
const mapDispatchToProps = {
  getDailyStocksAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksChats);
