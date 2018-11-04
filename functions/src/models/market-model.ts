export class Market {

    ///////////////
    // Variables //
    ///////////////
    private market_id: string
    private category: string
    private name: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        market_id: string,
        category: string,
        name: string

    ){

        this.market_id = market_id
        this.category = category
        this.name = name

    }

    /////////////
    // Getters //
    /////////////
    public getMarketId(): string {

        return this.market_id

    }

    public getCategory(): string {

        return this.category

    }

    public getName(): string {

        return this.name

    }

    /////////////
    // Setters //
    /////////////
    public setMarketId(marketId: string): void {

        this.market_id = marketId

    }

    public setCategory(category: string): void {

        this.category = category

    }

    public setName(name: string): void {

        this.name = name

    }

}