import { DatabaseService } from '../services/database-service'
import { Market } from '../models/market-model'

export class MarketService {

    ///////////////
    // Variables //
    ///////////////
    private static instance: MarketService

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
    public static getInstance(): MarketService {

        this.instance === undefined ? this.instance = new MarketService() : null

        return this.instance

    }

    /**
     * 
     * 
     * 
     */
	public async getMarkets(): Promise<Market[]> {
        
        const markets: Market[] = []

        await DatabaseService.getInstance().getFirestore().collection(`/markets`).get().then(newMarkets => {
        
            newMarkets.forEach(market => markets.push(new Market(market.data().market_id, market.data().category, market.data().name)))
        
        })

        return new Promise<Market[]>(resolve => resolve(markets))
        
    }

}