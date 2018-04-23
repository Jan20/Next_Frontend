export class Portfolio {

    ///////////////
    // Variables //
    ///////////////
    public cash: number
    public assets: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        cash: number,
        assets: number,
    ) {
        this.cash = cash
        this.assets = assets
    }

}