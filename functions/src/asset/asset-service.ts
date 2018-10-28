import { DatabaseService } from '../database/database-service'
import { Asset } from './asset-model'

export class AssetService {

    ///////////////
    // Variables //
    ///////////////
    private static instance: AssetService

    //////////////////
    // Constructors //
    //////////////////
    private constructor() {}

    ///////////////
    // Functions //
    ///////////////
    public static getInstance(): AssetService {

        this.instance === undefined ? this.instance = new AssetService() : null

        return this.instance

    }
    
    /**
     * 
     * Returns a specific asset from a given market and a given symbol
     * 
     * @param market 
     * @param symbol 
     */
    public async getAsset(market: string, symbol: string): Promise<Asset> {

        let returnAsset: Asset

        await DatabaseService.getInstance().getFirestore().doc(`/markets/${market}/assets/${symbol}`).get().then(asset => {

            returnAsset = new Asset(asset.data().symbol, asset.data().name, asset.data().market_id)

        })

        return new Promise<Asset>(resolve => resolve(returnAsset))

    }

    /**
     * 
     * Returns all assets of a given market
     * 
     * @param market 
     */
	public async getAssets(market: string): Promise<Asset[]> {
        
        const assets: Asset[] = []

        await DatabaseService.getInstance().getFirestore().collection(`/markets/${market}/assets`).get().then(newStocks => {
            
            newStocks.forEach(stock => assets.push(new Asset(stock.data().symbol, stock.data().name, stock.data().market_id)))
        
        })

        return new Promise<Asset[]>(resolve => resolve(assets))
        
    }

}