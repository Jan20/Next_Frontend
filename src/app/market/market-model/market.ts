export class Market{

    ///////////////
    // Variables //
    ///////////////
    public marketId: string
    public name: string
    public category: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        marketId: string,
        name: string,
        category: string,
    ){
        this.marketId = marketId
        this.name = name
        this.category = category
    }

    /////////////
    // Getters //
    /////////////
    public getMarketId(): string {
        return this.marketId
    }

    public getName(): string {
        return this.name
    }

    public getCategory(): string {
        return this.category
    }

    /////////////
    // Setters //
    /////////////
    public setMarketId(marketId: string): void {
        this.marketId = marketId
    }

    public setName(name: string): void {
        this.name = name
    }

    public setCategory(category: string): void {
        this.category = category
    }

}