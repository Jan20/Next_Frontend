import { Datapoint } from '../models/datapoint-model'
import { Market } from '../models/market-model'
import { Asset } from '../models/asset-model'
import { AssetService } from './asset-service'
import { AlphaService } from './alpha-service'
import { MarketService } from './market-service'
import { SeriesService } from './series-service'

export class UpdateService {

    //////////////////
    // Constructors //
    //////////////////
    public constructor() {}

    ///////////////
    // Functions //
    ///////////////
    /**
     * 
     * Updates time series data of all
     * assets across all markets
     * 
     */
    public async updateMarketData(): Promise<boolean>{

        // Checks for the most recent datapoints
        // that are available at AlphaVantage. The
        // reference to the most recent date is
        // is stored as string following an 'JJJJ-MM-DD'
        // pattern.
        const date: string = await this.checkMostRecentDatapoint()
        
        // Retrieves all markets stored within the 
        // related database as an array consting of
        // individual 'Market' objects.
        const markets: Market[] = await MarketService.getInstance().getMarkets()

        // Initializes the data import process
        // for the market stored at the arrays
        // first position.
        const result: boolean = await this.executeMarketCall(markets, date, 0)

        // If executeMarketCall() returns false indicating
        // that the functions execution has not gone
        // on until every single asset of all markets has
        // been updated, the updateMarketData() returns
        // false as well, enforcing a new cloud function
        // invocation.
        if (!result) {

            return new Promise<boolean>(resolve => resolve(false))

        } else {

            return new Promise<boolean>(resolve => resolve(true))

        }
        
    }

    /**
     * 
     * Updates time series data for every market within
     * the marktes array. 
     * 
     * @param markets: Array of 'Market' objects
     * @param date: The date of the most recent datapoint to be retrieved
     * @param index: Indicates the position of the current market within the markets array.
     * 
     */
    private async executeMarketCall(markets: Market[], date: string, index: number): Promise<any> {

        console.log('executeMarketCall')
        // Retrieves all assets of the market, the index is pointing to.
        const assets: Asset[] = await AssetService.getInstance().getAssets(markets[index].getMarketId())

        // Initializes a series of Alphavantage calls until
        // every asset of the current market has been updated.
        const result: boolean = await this.executeAlphavantageCall(markets[index], assets, date, 0)

        if (!result) {

            return new Promise<boolean>(resolve => resolve(false))

        }

        // If every asset of the previous market has been
        // udpated, a recursive function call is trcallediggered
        // with an incremented index pointing to the next
        // market within the markets array.
        if (index < markets.length - 1) {

            await this.executeMarketCall(markets, date, index + 1)
            
        }

    }

    /**
     * 
     * Retrieves all time series data for a specific market.
     * The function is constructed in a recursive manner and
     * checks during every iteration whether there are still
     * assets that have not been updated yet.
     * 
     * @param market: An Object of type Market providing a market_id attribute
     * @param assets: An array of Assets providing a symbol attribute
     * @param date: A date string pointing to the most recent datapoint available at AlphaVantage
     * @param index: A number referring to the current asset within the assets array
     * 
     */
    private async executeAlphavantageCall(market: Market, assets: Asset[], date: string, index: number): Promise<any> {

        // Checks for not yet updated assets within the
        // assets array. The index i will point to the
        // last asset that has not yet been updated.
        if (index === assets.length) {

            return new Promise<boolean>(resolve => resolve(true))

        }

        // Ugly workaround to insure that Alphavantage's API
        // is not complaining about too many requests at a time.
        await setTimeout( async () => {
            
            // Checks whether there are datapoints that need
            // to be updated.
            const datapointsMustBeUpdated: boolean = await this.checkForOutdatedDatapoints(market, assets[index], date)

            if (datapointsMustBeUpdated) {
            
                // Executes a call to Alphavantage's API and stores
                // the retrieved results in the connected Firestore database.
                await AlphaService.getInstance().callAlphaProject(assets[index].getMarketId(), assets[index].getSymbol())

            }

            // Recursive invocation of the function as long as there are
            // still assets in a market that were not updated yet.
            await this.executeAlphavantageCall(market, assets , date, index + 1)

        }, 16000)

    }

    /**
     * 
     * Checks wether there are missing datapoints for the
     * time series attribute of a given asset object
     * 
     * @param market: An object of class Market providing a market_id attribute
     * @param assets: An object of class Asset deliviering a symbol attribute
     * @param date: Date string referring ot the most recent datapoint that should be available
     * 
     */
    private async checkForOutdatedDatapoints(market: Market, asset: Asset, date: string): Promise<boolean> {
    
        // Returns either the value correspoing to the date string
        // or returns the string 'false' as the first entry of a
        // datapoint object.
        const datapoint: Datapoint = await SeriesService.getInstance().getDatapoint(market.getMarketId(), asset.getSymbol(), date)

        // If there is no datapoint that corresponds to the
        // date parameter, the function returns true, indicating
        // that further datapoint must be retrieved. If there is
        // a valid value associated with the date string, the function
        // returns false,
        if (datapoint.getDate() === 'false') {

            return new Promise<boolean>(resolve => resolve(true))

        } else {

            return new Promise<boolean>(resolve => resolve(false))

        }

    }


    /**
     * 
     * Checks the most recent datapoints available at Alphavantage's
     * API by first calling the API, importing the returned data
     * in a Firestore database and interating over all datapoints
     * and selecting the one with the most recent date value. The
     * stock which is used to test the most recent datapoints is
     * meant to be the one of Apple Inc.
     * 
     */
    private async checkMostRecentDatapoint(): Promise<string> {
        
        // Should hold a reference to the datapoint with
        // to the most recent date. The variable is initialized
        // with the January 1st 1970 in order to insure that
        // the date-comparison does not encounter something along
        // the lines of 'undefined is not an object'-
        let latestDatapoint: Datapoint = new Datapoint('1970-01-01', 0)

        // Calls Alphavantage's API and waits until all retrieved
        // datapoints are important in a given Firestore database.
        await AlphaService.getInstance().callAlphaProject('nasdaq', 'AAPL')
        
        // Retrieves all datapoints associated with the given stock
        // as an instance of the Series class.
        const series = await SeriesService.getInstance().getSeries('nasdaq', 'AAPL')

        // Iterates through all datapoints stored in retrieved
        // Series instance which contain a date with an associated value.
        series.getData().forEach(datapoint => {

            // Compares the dates of the current datapoint with
            // the date of the 'latestDatapoint' in milliseconds.
            // If the new datapoint's date is more recent than
            // the former latestDatapoint's date, than the new
            // datapoint is stored temporarily as the new
            // latestDatapoint.
            Date.parse(datapoint.getDate()) > Date.parse(latestDatapoint.getDate()) ? latestDatapoint = datapoint : null
                                
        })
        
        // Returns a promise referring to the date of the latetest datapoint
        // which is stored as string following a 'JJJJ-MM-DD' pattern.
        return new Promise<string>(resolve => resolve(latestDatapoint.getDate()))

    }
        
}