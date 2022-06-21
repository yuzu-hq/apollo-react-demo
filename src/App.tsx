import { useState } from 'react'
import logo from './logo.svg'
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
`

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

function keyBy<T>(src: Array<T>, keyer: (item: T) => string): Record<string, T> {
  return src.reduce<Record<string, T>>((map, item) => {
    map[keyer(item)] = item;
    return map;
  }, {})
}

function App() {
  const [securitySymbols, setSecuritySymbols] = useState<string[]>(defaultSecurities)
  const [cryptoSymbols, setCryptoSymbols] = useState<string[]>(defaultCryptos);

  const { data, loading } = useQuery(query, {
    variables: {
      cryptoSymbols,
      securitySymbols,
    },
    pollInterval: 5000,
    skip: !securitySymbols.length && !cryptoSymbols.length,
  })

  const securityData = data ? keyBy(data.securities, (({symbol}) => symbol)) : {};
  const cryptoData = data ? keyBy(data.cryptoTradingPairs, (({symbol}) => symbol)) : {};

  const toggle = (
    setter: typeof setSecuritySymbols | typeof setCryptoSymbols,
    symbols: string[],
    key: string
  ) => () => {
    if (symbols.indexOf(key) < 0) {
      symbols.push(key);
    } else {
      symbols = symbols.filter((s) => s !== key);
    }

    setter(() => symbols);
  }

  console.log({securitySymbols, cryptoSymbols});

  return (
    <div className="App">
      <div className="App__header">
        🍋 Yuzu React Demo
      </div>
      <div className="App__body">
        {loading && !data && "Loading"}
        {!loading && (
          <div className="">
            <h1>Stocks</h1>
            <div className="App__chip-container">
              {defaultSecurities.map((symbol) => {
                const price = securityData[symbol]?.lastTrade.price
                return (
                  <div className={`Chip ${price && 'Chip--active'}`} key={symbol}
                    onClick={toggle(setSecuritySymbols, securitySymbols, symbol)}>
                    <p>{symbol} {price && ':'}</p>
                    {price && (<p>${price}</p>)}
                  </div>
                )
              })}
            </div>
            <h1>Crypto</h1>
            <div className="App__chip-container">
              {defaultCryptos.map((symbol) => {
                const price = cryptoData[symbol]?.lastTrade.price;
                return (
                  <div className={`Chip ${price && 'Chip--active'}`} key={symbol}
                    onClick={toggle(setSecuritySymbols, securitySymbols, symbol)}>
                    <p>{symbol} {price && ':'}</p>
                    {price && (<p>${price}</p>)}
                  </div>
                  )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
