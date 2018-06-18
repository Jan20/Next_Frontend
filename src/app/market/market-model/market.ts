export class Market{

    ///////////////
    // Variables //
    ///////////////
    public market_id: string
    public name: string
    public category: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
    
        market_id: string,
        name: string,
        category: string,
    
    ){
    
        this.market_id = market_id
        this.name = name
        this.category = category
    
    }

}