"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const market_service_1 = require("../market/market-service");
const asset_service_1 = require("../asset/asset-service");
const alpha_service_1 = require("../alpha/alpha-service");
const series_service_1 = require("../series/series-service");
const datapoint_1 = require("../series/datapoint");
class UpdateService {
    ///////////////
    // Variables //
    ///////////////
    //////////////////
    // Constructors //
    //////////////////
    constructor() { }
    ///////////////
    // Functions //
    ///////////////
    /**
     *
     * Updates the time series' of all
     * assets across all markets
     *
     */
    updateMarketData() {
        return __awaiter(this, void 0, void 0, function* () {
            // Checks for the most recent datapoints
            // that are available at AlphaVantage. The
            // reference to the most recent date is
            // is stored as string following an 'JJJJ-MM-DD'
            // pattern.
            const date = yield this.checkMostRecentDatapoint();
            // Retrieves all markets stored within the 
            // related database as an array consting of
            // individual 'Market' objects.
            const markets = yield market_service_1.MarketService.getInstance().getMarkets();
            // Initializes the data import process
            // for the market stored at the arrays
            // first position.
            const result = yield this.executeMarketCall(markets, date, 0);
            // If executeMarketCall() returns false indicating
            // that the functions execution has not gone
            // on until every single asset of all markets has
            // been updated, the updateMarketData() returns
            // false as well, enforcing a new cloud function
            // invocation.
            if (!result) {
                return new Promise(resolve => resolve(false));
            }
            return new Promise(resolve => resolve(true));
        });
    }
    /**
     *
     * @param markets: Array of 'Market' objects
     * @param date: The date of the most recent datapoint to be retrieved
     * @param index: Indicates the position of the current market within the markets array.
     */
    executeMarketCall(markets, date, index) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieves all assets of the market the index is pointing to.
            const assets = yield asset_service_1.AssetService.getInstance().getAssets(markets[index].getMarketId());
            // Initializes a series of Alphavantage calls until
            // every asset of the current market has been updated.
            const result = yield this.executeAlphavantageCall(markets[index], assets, date, 0, 0);
            if (!result) {
                return new Promise(resolve => resolve(false));
            }
            // If every asset of the previous market has been
            // udpated, a recursive function call is trcallediggered
            // with an incremented index pointing to the next
            // market within the markets array.
            if (index < markets.length) {
                console.log('..........................................');
                console.log(index);
                console.log('..........................................');
                yield this.executeMarketCall(markets, date, index + 1);
            }
            // If all assets of all markets has been updated,
            // the functions returns true, leading to the termination
            // of the whole cloud function invocation.
            return new Promise(resolve => resolve(true));
        });
    }
    /**
     *
     *
     *
     * @param market
     * @param assets
     * @param date
     * @param index
     */
    executeAlphavantageCall(market, assets, date, index, assetsRetrieved) {
        return __awaiter(this, void 0, void 0, function* () {
            // If 15 assets has been retrieved in the current
            // cloud function call, executeMarketCall() returns
            // false, thus inforcing a new cloud function
            // invocation.
            if (assetsRetrieved > 12) {
                return new Promise(resolve => resolve(false));
            }
            // Checks for not yet updated assets within the
            // assets array. The index i will point to the
            // last asset that has not yet been updated.
            const i = yield this.checkForOutdatedDatapoints(market, assets, index, date);
            // Ugly workaround to insure that Alphavantage's API
            // is not complaining about too many requests at a time.
            yield setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                console.log('______________________________________________');
                console.log(i);
                console.log(assets[i]);
                // Executes a call to Alphavantage's API and stores
                // the retrieved results in the connected Firestore
                // database.
                yield alpha_service_1.AlphaService.getInstance().callAlphaProject(assets[i].getMarketId(), assets[i].getSymbol());
                // After an asset has been updated, 'assetsRetrieved'
                // will be incremented by 1 in order to ensure that
                // not more than 15 assets are retrieved within one
                // cloud function invocation.
                // If no errors have been occured within the
                // import process, the next asset will be updated.
                if (i < assets.length) {
                    this.executeAlphavantageCall(market, assets, date, i + 1, assetsRetrieved + 1);
                }
            }), 20000);
            // If all assets of the current market has been
            // updated, the function returns true.
            return new Promise(resolve => resolve(true));
        });
    }
    /**
     *
     *
     * @param market
     * @param assets
     * @param index
     * @param date
     *
     */
    checkForOutdatedDatapoints(market, assets, index, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(index);
            console.log(assets.length);
            // NOTE: Retrieves a single datepoint that corresponds to the date
            // parameter in the time series of a given asset, not the entire
            // time series.
            const datapoint = yield series_service_1.SeriesService.getInstance().getDatapoint(market.getMarketId(), assets[index].getSymbol(), date);
            // If there is no datapoint that corresponds to the
            // date paramter, the function returns false.
            if (datapoint.getDate() === 'false') {
                return new Promise(resolve => resolve(index));
            }
            // If the parameter index is equals to the length
            // of the assets array, there is nothing more to check,
            // thus the function returns true.
            if (index < assets.length - 1) {
                // Recursive call of the function with an increased index
                // intending to check all assets within the assets array
                // until the array's end is reached.
                yield this.checkForOutdatedDatapoints(market, assets, index + 1, date);
            }
            // if index is greater than assets.length, the default
            // promise is returned.
            return new Promise(resolve => resolve(index + 1));
        });
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
    checkMostRecentDatapoint() {
        return __awaiter(this, void 0, void 0, function* () {
            // Should hold a reference to the datapoint with
            // to the most recent date. The variable is initialized
            // with the January 1st 1970 in order to insure that
            // the date-comparison does not encounter something along
            // the lines of 'undefined is not an object'-
            let latestDatapoint = new datapoint_1.Datapoint('1970-01-01', 0);
            // Calls Alphavantage's API and waits until all retrieved
            // datapoints are important in a given Firestore database.
            yield alpha_service_1.AlphaService.getInstance().callAlphaProject('nasdaq', 'AAPL');
            // Retrieves all datapoints associated with the given stock
            // as an instance of the Series class.
            const series = yield series_service_1.SeriesService.getInstance().getSeries('nasdaq', 'AAPL');
            // Iterates through all datapoints stored in retrieved
            // Series instance which contain a date with an associated value.
            series.getData().forEach(datapoint => {
                // Compares the dates of the current datapoint with
                // the date of the 'latestDatapoint' in milliseconds.
                // If the new datapoint's date is more recent than
                // the former latestDatapoint's date, than the new
                // datapoint is stored temporarily as the new
                // latestDatapoint.
                Date.parse(datapoint.getDate()) > Date.parse(latestDatapoint.getDate()) ? latestDatapoint = datapoint : null;
            });
            // Returns a promise referring to the date of the latetest datapoint
            // which is stored as string following a 'JJJJ-MM-DD' pattern.
            return new Promise(resolve => resolve(latestDatapoint.getDate()));
        });
    }
}
exports.UpdateService = UpdateService;
//# sourceMappingURL=update-service.js.map