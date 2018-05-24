import { fb } from '../config/firebase'
import { Asset } from './asset-model'
import * as request from 'request'

export class AssetService {

    ///////////////
    // Variables //
    ///////////////
    private asset: Asset
    private assets: Asset[]

    //////////////////
    // Constructors //
    //////////////////
    // public constructor() {}

	///////////////
	// Functions //
	///////////////
    public async fetchAssetsFromAlphaVantage(userId: string, marketId: string) {
  
        await this.fetchAssets(userId, marketId)
        console.log(userId)
        console.log(marketId)
        console.log(this.assets)
        // this.fetchAssetFromAlphaVantage(userId, marketId, this.assets[0])

        for (let i = 0; i < this.assets.length; i++ ) {
            console.log('___________________________________________________________________________________________________')

            await this.fetchAssetFromAlphaVantage(userId, marketId, this.asset)

        }
  
    }

    /*
    *
    *	Simple function to access the Alpha Vantage API, make a call and write all relevant datapoints back
    *	into a Firestore realtime database
    *
    */
    public async fetchAssetFromAlphaVantage(userId: string, marketId: string, asset: Asset): Promise<void> {

        let chunks = []
        let values = []

        request.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${asset.symbol}&outputsize=full&apikey=6404`).on('data', response => {
            
            chunks.push(response)

        }).on('end', () => {
          
            let e = Buffer.concat(chunks)
            const f: any = e

            if(f) {
                values = JSON.parse(f)
            
                for (const key in values["Time Series (Daily)"]) {
                
    
                    console.log(key)
    
                    if (values['Time Series (Daily)'].hasOwnProperty(key)) {
                        
                        console.log(asset.name)
                            
                        fb.firestore().collection(`/users/${userId}/markets/${marketId}/assets/${asset.assetId}/series`).doc(key).set({
                            'name': asset.name,
                            'symbol': values['Meta Data']['2. Symbol'],
                            'close': values['Time Series (Daily)'][key]['4. close'],
                            'date': key,
                        })
                    }
                }
            }
        })
    }

	public async fetchAsset(userId: string, marketId: string, assetId: string): Promise<void> {
        
        await fb.firestore().doc(`/users/${userId}/markets/${marketId}/assets/${assetId}`).get().then(asset => {
            
            this.asset = new Asset( asset.data().assetId, asset.data().name, asset.data().symbol)
        
        })
    }
    
    public async fetchAssets(userId: string, marketId: string): Promise<void> {

        this.assets = []
        
        await fb.firestore().collection(`/users/${userId}/markets/${marketId}/assets`).get().then(assets => {
            
            assets.forEach(asset => {
            
                this.assets.push( new Asset( asset.data().assetId, asset.data().name, asset.data().symbol) )
            
            })
		})
	}


	/////////////
	// Getters //
	/////////////
	public async getAsset(userId: string, marketId: string, assetId: string): Promise<Asset> {
        
        await this.fetchAsset(userId, marketId, assetId)
        return new Promise<Asset>(resolve => resolve(this.asset))
        
	}

	public async getAssets(userId: string, marketId: string): Promise<Asset[]> {
        
        await this.fetchAssets(userId, marketId)
        return new Promise<Asset[]>(resolve => resolve(this.assets))

	}

	/////////////
	// Setters //
	/////////////
	public setAsset(asset: Asset): void {
    
        this.asset = asset
    
    }

	public setAssets(assets: Asset[]): void {
    
        this.assets = assets
    
    }
}