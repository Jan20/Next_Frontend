import { Entry } from './entry';

export class Asset {

    ///////////////
    // Variables //
    ///////////////
    public assetId: string
    public name: string
    public symbol: string
    public marketId: string
    public market: string
    public series: Entry[]
    public short_term_prediction: number
    public longTermSharpeRatio: number
    public market_id: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        
        assetId: string,
        name: string,
        symbol: string,
        market: string,
        short_term_prediction?: number,
        marketId?: string,
        longTermSharpeRatio?: number,
        market_id?: string,
 
    ) {
        
        this.assetId = assetId
        this.name = name
        this.symbol = symbol
        this.market = market
        this.short_term_prediction = short_term_prediction
        this.marketId = marketId
        this.longTermSharpeRatio = longTermSharpeRatio
        this.market_id = market_id
    
    }

    /////////////
    // Getters //
    /////////////
    public getAssetId(): string {
    
        return this.assetId
    
    }

    public getName(): string {
    
        return this.name
    
    }

    public getSymbol(): string {
    
        return this.symbol
    
    }

    public getMarketId(): string {

        return this.marketId

    }

    public getMarket(): string {
    
        return this.market
    
    }

    public getSeries(): Entry[] {
    
        return this.series
    
    }

    public getShortTermPrediction(): number {

        return this.short_term_prediction

    }

    public getLongTermSharpeRatio(): number {

        return this.longTermSharpeRatio

    }

    /////////////
    // Setters //
    /////////////
    public setAssetId(assetId: string): void {
    
        this.assetId = assetId
    
    }

    public setName(name: string): void {

        this.name = name

    }

    public setSymbol(symbol: string): void {

        this.symbol = symbol

    }

    public setMarketId(marketId: string): void {

        this.marketId = marketId

    }

    public setMarket(market: string): void {

        this.market = market

    }

    public setSeries(series: Entry[]): void {
    
        this.series = series
    
    }

    public setShortTermPrediction(short_term_prediction: number): void {

        this.short_term_prediction = short_term_prediction

    }

    public setLongTermSharpeRatio(longTermSharpeRatio: number): void {

        this.longTermSharpeRatio = longTermSharpeRatio

    }

}