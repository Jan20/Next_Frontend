import { Entry } from "../../asset/asset-model/entry";

export class PortfolioMember {

    ///////////////
    // Variables //
    ///////////////
    public portfolioMemberId: string
    public name: string
    public symbol: string
    public marketId: string
    public market: string
    public series: Entry[]
    public buyDate: string
    public sellDate: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        portfolioMemberId: string,
        name: string,
        symbol: string,
        marketId: string,
        market: string,
        series: Entry[],
        buyDate: string,
        sellDate: string
    ) {
        this.portfolioMemberId = portfolioMemberId
        this.name = name
        this.symbol = symbol
        this.marketId = marketId
        this.market = market
        this.series = series
        this.buyDate = buyDate
        this.sellDate = sellDate
    }


}