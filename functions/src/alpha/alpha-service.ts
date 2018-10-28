import * as request from 'request';
import { Subject } from "rxjs";
import { SeriesService } from '../series/series-service'
import { Series } from '../series/series';
import { Datapoint } from '../series/datapoint';
import { resolve, async } from 'q';

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
    public async callAlphaProject(market: string, symbol: string): Promise<boolean> {

        console.log('AlphaService has been called')
        const chunks = []
        const url = `https://us-central1-alpha-002.cloudfunctions.net/api/alpha/${symbol}`
        let result: boolean = false

        await request.post(url).on('data', response => {
        
            chunks.push(response)

        }).on('end', async () => {

            try {

                // After all data chunks are present, they are getting
                // concatinated and parsed into a string.
                let json: JSON = JSON.parse(Buffer.concat(chunks).toString())
                let series: Series = new Series()

                for (var key in json) {

                    console.log(key)
                    json.hasOwnProperty(key) ? series.getData().push(new Datapoint(key, json[key]['4. close'])) : null

                }

                console.log(symbol)
                SeriesService.getInstance().addSeries(market, symbol, series)

                result = true
                return new Promise<boolean>(resolve => resolve(result = true))
                
            } catch(error) {
                
                result = false
                return new Promise<boolean>(resolve => resolve(result = false))

            }

        })

        return new Promise<boolean>(resolve => resolve(true))

    }

}
