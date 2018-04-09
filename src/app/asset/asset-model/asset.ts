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
    public market: string
    public series: Entry[]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        assetId: string,
        name: string,
        symbol: string,
        market: string,
    ) {
        this.assetId = assetId
        this.name = name
        this.symbol = symbol
        this.market = market
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

    public getMarket(): string {
        return this.market
    }

    public getSeries(): Entry[] {
        return this.series
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

    public setMarket(market: string): void {
        this.market = market
    }

    public setSeries(series: Entry[]): void {
        this.series = series
    }

}