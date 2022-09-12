import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Decimal: any;
};

/** BestBidOffer represents the current best bid and ask for an asset. Sometimes known as the 'top of book.' */
export type BestBidOffer = {
  __typename?: 'BestBidOffer';
  /** Quote representing the best current ask */
  ask: Quote;
  /** Quote representing the best current bid. */
  bid: Quote;
  /** Time of this quote */
  time: Scalars['DateTime'];
};

/** CryptoAggregate represents a set of trading metrics for a period of time. Also known as a 'candle,' or 'OHLCV.' */
export type CryptoAggregate = {
  __typename?: 'CryptoAggregate';
  /** The price at which the last trade in this period occured. */
  close: Scalars['Decimal'];
  /** The highest price traded during the period. */
  high: Scalars['Decimal'];
  /** The lowest price traded during the period. */
  low: Scalars['Decimal'];
  /** The price at which the first trade in this period occured. */
  open: Scalars['Decimal'];
  /** The amount of time represented by this aggregate. */
  period: CryptoAggregatePeriod;
  /** The beginning of the period represented by this aggregate. */
  time: Scalars['DateTime'];
  /** Volume is the quantity of the asset traded during this period. */
  volume: Scalars['Decimal'];
};

export enum CryptoAggregatePeriod {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE'
}

/** CryptoAsset can be a cryptocurrency like Bitcoin or Ether, a digital token like AAVE, or a stablecoin like USDC. */
export type CryptoAsset = {
  __typename?: 'CryptoAsset';
  /** ID is the unique identifier of this asset. Since assets may share symbols, this ID is a opaque UUID */
  id: Scalars['ID'];
  /** Name is the colloquial name for this asset (e.g. 'Bitcoin') */
  name: Scalars['String'];
  /** Symbol is the colloquial symbol for this asset (e.g. BTC). Note that these may not be unique. */
  symbol: Scalars['String'];
};

/**
 * CryptoTradingPair represents a pair of assets that can be purchased or sold on an exchange (e.g. "BTC-USD").
 *
 * The first half of the pair is called the 'base asset,' and is what is being bought or sold in a trade. The second half
 * is called the 'quote asset' and is the currency in which the base asset is denominated.
 *
 * For example: 'BTC-USD' is, 'the price of Bitcoin denominated in US Dollars.'
 */
export type CryptoTradingPair = {
  __typename?: 'CryptoTradingPair';
  /** Historical aggregates for this pair. */
  aggregates: Array<CryptoAggregate>;
  /** The asset in the pair that is being bought or sold (e.g. 'BTC' in 'BTC-USD'). */
  baseAsset: CryptoAsset;
  /** The most recent best bid and offer for this pair. */
  bbo?: Maybe<BestBidOffer>;
  /** The unique identifier for this pair (e.g. 'BTC-USD') */
  id: Scalars['ID'];
  /** The most recent trade that occured for this asset. Commonly used as the 'current price.' */
  lastTrade?: Maybe<Trade>;
  /**
   * The denominating asset in this pair (e.g. 'USD in 'BTC-USD').
   *
   * Note that this can be either a fiat Currency, or another CryptoAsset
   */
  quoteAsset: CryptoTradingPairQuoteAsset;
  /** The colloquial symbol for this pair (e.g. 'BTC-USD') */
  symbol: Scalars['String'];
};


/**
 * CryptoTradingPair represents a pair of assets that can be purchased or sold on an exchange (e.g. "BTC-USD").
 *
 * The first half of the pair is called the 'base asset,' and is what is being bought or sold in a trade. The second half
 * is called the 'quote asset' and is the currency in which the base asset is denominated.
 *
 * For example: 'BTC-USD' is, 'the price of Bitcoin denominated in US Dollars.'
 */
export type CryptoTradingPairAggregatesArgs = {
  input?: InputMaybe<CryptoTradingPairAggregateFilterInput>;
};

export type CryptoTradingPairAggregateFilterInput = {
  /** Time after which aggregates are returned */
  after?: InputMaybe<Scalars['DateTime']>;
  /** Time before which aggregates are returned. Default: current_time */
  before?: InputMaybe<Scalars['DateTime']>;
  /** Number of aggregates returned: Default: 100 */
  limit?: InputMaybe<Scalars['Int']>;
  /** Period in which to request the aggregate. Default: DAY */
  period?: InputMaybe<CryptoAggregatePeriod>;
};

/**
 * Used to search for specific crypto trading pairs, or groups of trading pairs.
 *
 * Note: if no individual filters are provided, all pairs will be returned
 */
export type CryptoTradingPairFilterInput = {
  /** Use to limit the number of symbols in the response: Default: 100, max: 500 */
  limit?: InputMaybe<Scalars['Int']>;
  /** Use to page through results: Default: 0 */
  offset?: InputMaybe<Scalars['Int']>;
  /** Provide symbols to get specific trading symbols, e.g. 'BTC-USD' */
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export type CryptoTradingPairQuoteAsset = CryptoAsset | Currency;

/** Fiat currencies (e.g. USD, GBP, JPY */
export type Currency = {
  __typename?: 'Currency';
  /** Country code of the originating country (e.g. 'US') */
  countryCode: Scalars['String'];
  /** Number of decimal places used to denominate this currency (e.g. '2') */
  decimalPlaces: Scalars['Int'];
  /** 🐣 Returns the corresponding flag emoji for the associated country (eg 🇺🇦 🇺🇸) */
  flagEmoji: Scalars['String'];
  /** ID of the currency (same as symbol; e.g. 'USD') */
  id: Scalars['ID'];
  /** Name of the currency (e.g. 'US Dollar') */
  name: Scalars['String'];
  /** 3 character ISO 4217 currency code (e.g. 'USD') */
  symbol: Scalars['String'];
};

/** ForexAggregate represents a set of trading metrics for a period of time. Also known as a 'candle,' or 'OHLCV.' */
export type ForexAggregate = {
  __typename?: 'ForexAggregate';
  /** The price at which the last trade in this period occured. */
  close: Scalars['Decimal'];
  /** The highest price traded during the period. */
  high: Scalars['Decimal'];
  /** The lowest price traded during the period. */
  low: Scalars['Decimal'];
  /** The price at which the first trade in this period occured. */
  open: Scalars['Decimal'];
  /** The beginning of the period represented by this aggregate. */
  time: Scalars['DateTime'];
};

/**
 * ForexTradingPair represents a pair of currencies that can be exchanged for one another (e.g. 'GBP-USD').
 *
 * The first half of the pair is called the 'base currency,' and is what is being bought or sold in a trade. The second half
 * is called the 'quote currency' and is the currency in which the base asset is denominated.
 *
 * For example: 'GBP-USD' is, 'the exchange rate for Pound Sterling in US Dollars'
 */
export type ForexTradingPair = {
  __typename?: 'ForexTradingPair';
  /** Historical price metrics for this pair. */
  aggregates: Array<ForexAggregate>;
  /** The currency in the pair that is being bought or sold (e.g. 'GBP' in 'GBP-USD'). */
  baseCurrency: Currency;
  /**
   * The current conversion rate from the base to the quote
   *
   * E.g. a `currentRate` of 1.5 for GBP-USD means that 1 GBP is worth 1.50 USD at the current market rate
   */
  currentRate: Scalars['Decimal'];
  /** The unique identifier of this pair (e.g. 'GBP-USD') */
  id: Scalars['ID'];
  /** The denominating asset in this pair (e.g. 'USD in 'GBP-USD'). */
  quoteCurrency: Currency;
  /** The colloquial symbol of this pair (e.g. 'GBP-USD') */
  symbol: Scalars['String'];
};


/**
 * ForexTradingPair represents a pair of currencies that can be exchanged for one another (e.g. 'GBP-USD').
 *
 * The first half of the pair is called the 'base currency,' and is what is being bought or sold in a trade. The second half
 * is called the 'quote currency' and is the currency in which the base asset is denominated.
 *
 * For example: 'GBP-USD' is, 'the exchange rate for Pound Sterling in US Dollars'
 */
export type ForexTradingPairAggregatesArgs = {
  input?: InputMaybe<ForexTradingPairAggregateFilterInput>;
};

export type ForexTradingPairAggregateFilterInput = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
};

/** Used to request info on forex trading pairs (e.g. EURUSD) */
export type ForexTradingPairFilterInput = {
  /** Use to limit the number of returned objects. Default: 100 */
  limit?: InputMaybe<Scalars['Int']>;
  /** Used to page through results. Default: 0 */
  offset?: InputMaybe<Scalars['Int']>;
  /** Use to request specific trading symbols [EURUSD, GBPUSD] */
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

export enum HolidayStatus {
  Closed = 'CLOSED',
  EarlyClose = 'EARLY_CLOSE'
}

export type MarketHolidayFilterInput = {
  after?: InputMaybe<Scalars['Date']>;
  before?: InputMaybe<Scalars['Date']>;
  limit?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<HolidayStatus>;
};

export type Query = {
  __typename?: 'Query';
  cryptoTradingPairs: Array<CryptoTradingPair>;
  forexTradingPairs: Array<ForexTradingPair>;
  securities: Array<Security>;
  usMarketHolidays: Array<UsMarketHoliday>;
  usMarketHours: UsMarketHours;
};


export type QueryCryptoTradingPairsArgs = {
  input?: InputMaybe<CryptoTradingPairFilterInput>;
};


export type QueryForexTradingPairsArgs = {
  input?: InputMaybe<ForexTradingPairFilterInput>;
};


export type QuerySecuritiesArgs = {
  input?: InputMaybe<SecurityFilterInput>;
};


export type QueryUsMarketHolidaysArgs = {
  input?: InputMaybe<MarketHolidayFilterInput>;
};

/**
 * Quote represents an open offer to buy or sell an asset. Another way to think of a Quote is as a single limit order,
 * or a collection of limit orders grouped by the price at which they are offered.
 */
export type Quote = {
  __typename?: 'Quote';
  /** The price at which this offer is made. */
  price: Scalars['Decimal'];
  /** The amount being offered. */
  quantity: Scalars['Decimal'];
};

/** Security represents a stock, ETF, or Mutual Fund. */
export type Security = {
  __typename?: 'Security';
  /** Historical price metrics for this security. */
  aggregates: Array<SecurityAggregate>;
  /** The current best bid and offer for this security. */
  bbo?: Maybe<BestBidOffer>;
  /** The exchange on which this security is primarily traded (e.g. 'XNAS') */
  exchange: Scalars['String'];
  /**
   * The composite FIGI of this security. FIGI stands for 'Financial Instrument Global Identifier.'
   *
   * Read more about FIGIs here: https://www.openfigi.com/about
   */
  figiComposite: Scalars['String'];
  /**
   * The unique identifer of this security. Same as figiComposite.
   * Because symbols may not be unique, or are subject to change, use this id as a key in your own system.
   */
  id: Scalars['ID'];
  /** The last trade for this security. */
  lastTrade?: Maybe<Trade>;
  /** The name of the security (e.g. 'AAPL Inc' or 'Berkshire Hathaway Inc. - Class B') */
  name: Scalars['String'];
  /** The type of the security (e.g. COMMON_STOCK or ETF) */
  securityType: SecurityType;
  splits: Array<SecuritySplit>;
  /** The colloquial symbol of the security (e.g. 'AAPL'). */
  symbol: Scalars['String'];
};


/** Security represents a stock, ETF, or Mutual Fund. */
export type SecurityAggregatesArgs = {
  input?: InputMaybe<SecurityAggregateFilterInput>;
};

/**
 * SecurityAggregate represents a set of trading metrics for a period of time. Also known as a 'candle,' or 'OHLCV.'
 *
 * When period == DAY, preMarketOpen and afterHoursClose are also available
 */
export type SecurityAggregate = {
  __typename?: 'SecurityAggregate';
  /** The price of the last trade that took place after regular market hours. */
  afterHoursClose?: Maybe<Scalars['Decimal']>;
  /** The price at which the last trade in this period occured. */
  close: Scalars['Decimal'];
  /** The highest price traded during the period. */
  high: Scalars['Decimal'];
  /** The lowest price traded during the period. */
  low: Scalars['Decimal'];
  /** The price at which the first trade in this period occured. */
  open: Scalars['Decimal'];
  /** The amount of time represented by this aggregate. */
  period: SecurityAggregatePeriod;
  /** The price of the first trade that took place during premarket hours. */
  preMarketOpen?: Maybe<Scalars['Decimal']>;
  /** The beginning of the period represented by this aggregate. */
  time: Scalars['DateTime'];
  /** The number of shares traded during the period. */
  volume: Scalars['Decimal'];
};

export type SecurityAggregateFilterInput = {
  /** Time after which aggregates are returned */
  after?: InputMaybe<Scalars['DateTime']>;
  /** Time before which aggregates are returned. Default: current_time */
  before?: InputMaybe<Scalars['DateTime']>;
  /** Number of aggregates returned: Default: 100 */
  limit?: InputMaybe<Scalars['Int']>;
  /** Period in which to request the aggregate. Default: DAY */
  period?: InputMaybe<SecurityAggregatePeriod>;
};

export enum SecurityAggregatePeriod {
  Day = 'DAY'
}

export type SecurityFilterInput = {
  figiComposites?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  symbols?: InputMaybe<Array<Scalars['String']>>;
};

/** SecuritySplit represents a split event */
export type SecuritySplit = {
  __typename?: 'SecuritySplit';
  date: Scalars['Date'];
  newShares: Scalars['Int'];
  oldShares: Scalars['Int'];
  ratio: Scalars['Decimal'];
};

export enum SecurityType {
  Adr = 'ADR',
  ClosedEndFund = 'CLOSED_END_FUND',
  CommonStock = 'COMMON_STOCK',
  Etf = 'ETF',
  OpenEndFund = 'OPEN_END_FUND',
  PreferredStock = 'PREFERRED_STOCK',
  Unit = 'UNIT',
  Warrant = 'WARRANT'
}

/** Trade is an exchange between a buyer and seller, at a fixed price, for a fixed quantity of an asset. */
export type Trade = {
  __typename?: 'Trade';
  /** The price of the trade. */
  price: Scalars['Decimal'];
  /** The amount of the asset that changed hands. */
  quantity: Scalars['Decimal'];
  /** The time at which the trade occured. */
  time: Scalars['DateTime'];
};

/** TradingDay represents the open and close of a market day in the United States. */
export type TradingDay = {
  __typename?: 'TradingDay';
  closeTime: Scalars['DateTime'];
  openTime: Scalars['DateTime'];
};

/**
 * USMarketHoliday is a day on which the market is either closed or has adjusted hours.
 *
 * Normally market hours are from 9:30AM - 4:00PM Eastern.
 */
export type UsMarketHoliday = {
  __typename?: 'UsMarketHoliday';
  /** If the market is not fully closed, the time that the market closes on this day. */
  closeTime?: Maybe<Scalars['DateTime']>;
  /** The date of the market day adjustment. */
  date: Scalars['Date'];
  /** The name of the holiday (e.g. 'Juneteenth') */
  name: Scalars['String'];
  /** If the market is not fully closed, the time that the market opens on this day. */
  openTime?: Maybe<Scalars['DateTime']>;
  /** Whether the market is fully closed or closes early on this day. */
  status: HolidayStatus;
};

/** UsMarketHours is a simple helper to retrieve adjacent market hours. */
export type UsMarketHours = {
  __typename?: 'UsMarketHours';
  /** If markets are currently open, the current trading day. If the markets are closed, the next trading day. */
  nextTradingDay: TradingDay;
  /** True if the market is currently open during regular hours. */
  openNow: Scalars['Boolean'];
  /** The most recently completed trading day. */
  previousTradingDay: TradingDay;
};

export type ReactYuzuDemoQueryVariables = Exact<{
  securitySymbols: Array<Scalars['String']> | Scalars['String'];
  cryptoSymbols: Array<Scalars['String']> | Scalars['String'];
}>;


export type ReactYuzuDemoQuery = { __typename?: 'Query', usMarketHours: { __typename?: 'UsMarketHours', openNow: boolean }, securities: Array<{ __typename?: 'Security', id: string, symbol: string, lastTrade?: { __typename?: 'Trade', price: any } | null }>, cryptoTradingPairs: Array<{ __typename?: 'CryptoTradingPair', id: string, symbol: string, lastTrade?: { __typename?: 'Trade', price: any } | null }> };


export const ReactYuzuDemoDocument = `
    query ReactYuzuDemo($securitySymbols: [String!]!, $cryptoSymbols: [String!]!) {
  usMarketHours {
    openNow
  }
  securities(input: {symbols: $securitySymbols}) {
    id
    symbol
    lastTrade {
      price
    }
  }
  cryptoTradingPairs(input: {symbols: $cryptoSymbols}) {
    id
    symbol
    lastTrade {
      price
    }
  }
}
    `;
export const useReactYuzuDemoQuery = <
      TData = ReactYuzuDemoQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: ReactYuzuDemoQueryVariables,
      options?: UseQueryOptions<ReactYuzuDemoQuery, TError, TData>
    ) =>
    useQuery<ReactYuzuDemoQuery, TError, TData>(
      ['ReactYuzuDemo', variables],
      fetcher<ReactYuzuDemoQuery, ReactYuzuDemoQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ReactYuzuDemoDocument, variables),
      options
    );