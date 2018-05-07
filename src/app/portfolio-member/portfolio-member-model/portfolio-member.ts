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
    public positionOpend: string
    public positionClosed: string
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
        positionOpend: string,
        positionClosed: string,
        status: string

    ) {

        this.portfolioMemberId = portfolioMemberId
        this.name = name
        this.symbol = symbol
        this.assetId = assetId
        this.marketId = marketId
        this.market = market
        this.quantity = quantity
        this.positionOpend = positionOpend
        this.positionClosed = positionClosed
        this.status = status

    }


}