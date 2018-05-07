export class Portfolio {

    ///////////////
    // Variables //
    ///////////////
    public portfolioId: string
    public assets: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        portfolioId: string,
        assets: number,

    ) {

        this.portfolioId = portfolioId
        this.assets = assets

    }

}