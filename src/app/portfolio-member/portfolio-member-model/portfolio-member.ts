import { Entry } from "../../asset/asset-model/entry";

export class PortfolioMember {

    ///////////////
    // Variables //
    ///////////////
    public portfolioMemberId: string
    public name: string
    public symbol: string
    public assetId: string
    public marketId: string
    public market: string
    public quantity: number
    public buyDate: string
    public sellDate: string
    public status: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        portfolioMemberId: string,
        name: string,
        symbol: string,
        assetId: string,
        marketId: string,
        market: string,
        quantity: number,
        buyDate: string,
        sellDate: string,
        status: string

    ) {

        this.portfolioMemberId = portfolioMemberId
        this.name = name
        this.symbol = symbol
        this.assetId = assetId
        this.marketId = marketId
        this.market = market
        this.quantity = quantity
        this.buyDate = buyDate
        this.sellDate = sellDate
        this.status = status

    }


}