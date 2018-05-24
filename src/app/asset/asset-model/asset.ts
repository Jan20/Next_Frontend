import { Time } from '@angular/common'
import { Optional } from '@angular/core';
import { Entry } from './entry'

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
    public sharpe_ratio: number

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
        sharpe_ratio?: number,
 
    ) {
        
        this.assetId = assetId
        this.name = name
        this.symbol = symbol
        this.market = market
        this.short_term_prediction = short_term_prediction
        this.marketId = marketId
        this.sharpe_ratio = sharpe_ratio
    
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

    public getSharpeRatio(): number {

        return this.sharpe_ratio

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

    public setSharpeRatio(sharpe_ratio: number): void {

        this.sharpe_ratio = sharpe_ratio

    }

}