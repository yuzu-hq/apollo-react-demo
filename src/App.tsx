import './App.css'

import  { gql, useQuery } from '@apollo/client'

const query = gql`
  query ReactYuzuDemo($securitySymbols: [String!]!, $cryptoSymbols: [String!]!) {
    usMarketHours {
      openNow
    }
    securities(input: { symbols: $securitySymbols }) {
      id
      symbol
      lastTrade {
        price
      }
    }
    cryptoTradingPairs(input: { symbols: $cryptoSymbols }) {
      id
      symbol
      lastTrade {
        price
      }
    }
  }
`;

const defaultSecurities = [
  "AAPL",
  "VTI",
  "MSFT",
  "TSLA",
  "EXFY",
  "SOND",
  "QQQ",
  "SPY",
]

const defaultCryptos = [
  "BTC-USD",
  "ETH-USD",
  "SOL-USD",
  "DOGE-USD",
  "UNI-USD"
]

function App() {
  const { data, loading } = useQuery(query, {
    variables: {
      cryptoSymbols: defaultCryptos,
      securitySymbols: defaultSecurities,
    },
    pollInterval: 5000, // Set this to update prices periodically
  })

  if (loading) {
    return "Loading..."
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Symbol</td>
          <td>Current Price</td>
        </tr>
      </thead>
      <tbody>
        {data.securities.map(({symbol, lastTrade}) => (
          <tr>
            <td>{symbol}</td>
            <td>${lastTrade.price}</td>
          </tr>
        ))}
        {data.cryptoTradingPairs.map(({symbol, lastTrade}) => (
          <tr>
            <td>{symbol}</td>
            <td>${lastTrade.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App 
