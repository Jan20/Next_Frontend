export class Asset {

    ///////////////
    // Variables //
    ///////////////
    private symbol: string
    private name: string
    private market_id: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        symbol: string,
        name: string,
        market_id: string,

    ){

        this.symbol = symbol
        this.name = name
        this.market_id = market_id

    }

    /////////////
    // Getters //
    /////////////

    public getSymbol(): string {

        return this.symbol

    }

    public getName(): string {

        return this.name

    }
    public getMarketId(): string {

        return this.market_id

    }


    /////////////
    // Setters //
    /////////////


    public setSymbol(symbol: string): void {

        this.symbol = symbol

    }

    public setName(name: string): void {

        this.name = name

    }

    public setMarketId(marketId: string): void {

        this.market_id = marketId

    }
}