import * as request from 'request'
import { SeriesService } from './series-service'
import { Series } from '../models/series-model'
import { Datapoint } from '../models/datapoint-model'

export class AlphaService {

    ///////////////
    // Variables //
    ///////////////
    /**
     * 
     * Holds an instance of an AlphaService class.
     * It should be initialized as soon as the
     * getInstance() function is called for the first
     * time.
     * 
     */
    private static instance: AlphaService

    //////////////////
    // Constructors //
    //////////////////
    /**
     * 
     * Default constructor which has to be private
     * in order to implement a Singleton pattern.
     * 
     */
    private constructor() {}

    ///////////////
    // Functions //
    ///////////////
    public static getInstance(): AlphaService {

        this.instance === undefined ? this.instance = new AlphaService() : null

        return this.instance

    }

    /**
     * 
     * Simple function that calls Alphavantage's API via
     * a service and returns a boolean value indicating
     * that the call has been executed.
     * 
     * @param market: Refers to a valid stock market like 'dax' or 'nasdaq'
     * @param symbol: Refers to a stock symbol e.g. 'MSFT' or 'AAPL'
     */
    public async callAlphaProject(market: string, symbol: string): Promise<any> {

        const chunks: any = []
        const url: string = `https://us-central1-alpha-002.cloudfunctions.net/api/alpha/${symbol}`
        

        await request.post(url).on('data', response => chunks.push(response)).on('end', async () => {
        
            const json: JSON = JSON.parse(Buffer.concat(chunks).toString())
            const series: Series = new Series()
        
            for (let key in json) {

                json.hasOwnProperty(key) ? series.getData().push(new Datapoint(key, json[key]['4. close'])) : null

            }

            await SeriesService.getInstance().addSeries(market, symbol, series)

            return new Promise<boolean>(resolve => resolve(true))
            
        })

    }

}
