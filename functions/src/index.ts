import * as functions from 'firebase-functions'
import * as express from 'express'
import { MarketService } from './market/market-service'
import { AssetService } from './asset/asset-service'
import { UpdateService } from './update/update-service'


const router = express()

const asyncMiddleware = fn => (req, res, next) => {

	Promise.resolve(fn(req, res, next)).catch(next)

}

router.get('/markets/:marketId', asyncMiddleware(async (req, res, next) => {

	AssetService.getInstance().getAssets(req.params['marketId']).catch(error => console.log(error)).then(response => {
		
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(response));
		
	}).catch(error => console.log(error))

}))

router.get('/markets', asyncMiddleware(async (req, res, next) => {

	MarketService.getInstance().getMarkets().catch(error => console.log(error)).then(response => {
			
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(response));
		
	}).catch(error => console.log(error))

}))

router.get('/updateMarketData', asyncMiddleware(async (req, res, next) => {
	
	new UpdateService().updateMarketData().then(result => {

		if (result) {

			res.setHeader('Content-Type', 'text/html');
			res.send('All assets are up-to-date.');

		} else {


			res.setHeader('Content-Type', 'text/html');
			res.send('There are still some unupdated assets')

		}

	})
	
}))


export const api = functions.https.onRequest( (req, res) => {
	
	!req.path ? req.url = `/${req.url}` : null

	return router(req, res)

})



