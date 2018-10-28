import { DatabaseService } from '../database/database-service'
import { Series } from './series'
import { Datapoint } from './datapoint';

export class SeriesService {

    ///////////////
    // Variables //
    ///////////////
    private static instance: SeriesService

    //////////////////
    // Constructors //
    //////////////////
    private constructor() {}

    ///////////////
    // Functions //
    ///////////////
    /**
     * 
     * 
     * 
     */
    public static getInstance(): SeriesService {

        this.instance === undefined ? this.instance = new SeriesService() : null

        return this.instance

    }

	///////////////
	// Functions //
	///////////////
    /**
     * 
     * @param marketId 
     * 
     */
    public addSeries(market: string, symbol: string, series: Series): void {
        
        series.getData().forEach(datapoint => {

            DatabaseService.getInstance().getFirestore().doc(`/markets/${market}/assets/${symbol}/series/${datapoint.getDate()}`).set(datapoint.getObject())
            
        })

    }

    /**
     * 
     * Returns all datapoints stored in the series collection of a given
     * firebase database. The timeseries is returned as a promise of an instance 
     * of the Series class.
     * 
     * @param market 
     * @param symbol 
     */
    public async getSeries(market: string, symbol: string): Promise<Series> {

        // Creates a new empty series meant to hold all datapoints stored
        // under a given symbol in a firebase database.
        let series: Series = new Series()

        // The database service calls a firestore instance and returns 
        // all datapoints corresponding to the given symbol.
        await DatabaseService.getInstance().getFirestore().collection(`/markets/${market}/assets/${symbol}/series`).get().then(storedSeries => {

            // Todo: Better mapping
            storedSeries.forEach(datapoint => {

                series.getData().push(new Datapoint(datapoint.data().date, datapoint.data().value))

            })

        })

        // Returns a promise which is being resolved after the database
        // service request has been completed.
        return new Promise<Series>(resolve => resolve(series))

    }

    /**
     * 
     * 
     * @param market: A string reference a market_id like 'dax' or 'nasdaq'
     * @param symbol: A stock symbol like 'AAPL'
     * @param date: A date folowing the format 'JJJJ-MM-DD'
     */
    public async getDatapoint(market: string, symbol: string, date: string): Promise<Datapoint> {

        const result: Datapoint = await DatabaseService.getInstance().getFirestore().doc(`/markets/${market}/assets/${symbol}/series/${date}`).get().then(async d => {

            console.log('++++++++++++++++++++++++++++++++++++++++++++++++-')
            console.log(d.data())
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++-')

            if (d.data() === undefined) {
                
                return new Promise<Datapoint>(resolve => resolve(new Datapoint('false', 0)))

            }
            
            return new Promise<Datapoint>(resolve => resolve(new Datapoint(d.data().date, d.data().value)))

        })

        console.log('++++++++++++++++++++++++++++++++++++++++++++++++-')
        console.log(result)
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++-')
        return new Promise<Datapoint>(resolve => resolve(result))

    }

}