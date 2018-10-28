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
const database_service_1 = require("../database/database-service");
const series_1 = require("./series");
const datapoint_1 = require("./datapoint");
class SeriesService {
    //////////////////
    // Constructors //
    //////////////////
    constructor() { }
    ///////////////
    // Functions //
    ///////////////
    /**
     *
     *
     *
     */
    static getInstance() {
        this.instance === undefined ? this.instance = new SeriesService() : null;
        return this.instance;
    }
    ///////////////
    // Functions //
    ///////////////
    /**
     *
     * @param marketId
     *
     */
    addSeries(market, symbol, series) {
        series.getData().forEach(datapoint => {
            database_service_1.DatabaseService.getInstance().getFirestore().doc(`/markets/${market}/assets/${symbol}/series/${datapoint.getDate()}`).set(datapoint.getObject());
        });
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
    getSeries(market, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            // Creates a new empty series meant to hold all datapoints stored
            // under a given symbol in a firebase database.
            let series = new series_1.Series();
            // The database service calls a firestore instance and returns 
            // all datapoints corresponding to the given symbol.
            yield database_service_1.DatabaseService.getInstance().getFirestore().collection(`/markets/${market}/assets/${symbol}/series`).get().then(storedSeries => {
                // Todo: Better mapping
                storedSeries.forEach(datapoint => {
                    series.getData().push(new datapoint_1.Datapoint(datapoint.data().date, datapoint.data().value));
                });
            });
            // Returns a promise which is being resolved after the database
            // service request has been completed.
            return new Promise(resolve => resolve(series));
        });
    }
    /**
     *
     *
     * @param market: A string reference a market_id like 'dax' or 'nasdaq'
     * @param symbol: A stock symbol like 'AAPL'
     * @param date: A date folowing the format 'JJJJ-MM-DD'
     */
    getDatapoint(market, symbol, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_service_1.DatabaseService.getInstance().getFirestore().doc(`/markets/${market}/assets/${symbol}/series/${date}`).get().then((d) => __awaiter(this, void 0, void 0, function* () {
                if (d.data() === undefined) {
                    return new Promise(resolve => resolve(new datapoint_1.Datapoint('false', 0)));
                }
                return new Promise(resolve => resolve(new datapoint_1.Datapoint(d.data().date, d.data().value)));
            }));
            console.log(result);
            return new Promise(resolve => resolve(result));
        });
    }
}
exports.SeriesService = SeriesService;
//# sourceMappingURL=series-service.js.map