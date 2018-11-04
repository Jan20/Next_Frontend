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
const request = require("request");
const series_service_1 = require("./series-service");
const series_model_1 = require("../models/series-model");
const datapoint_model_1 = require("../models/datapoint-model");
class AlphaService {
    //////////////////
    // Constructors //
    //////////////////
    /**
     *
     * Default constructor which has to be private
     * in order to implement a Singleton pattern.
     *
     */
    constructor() { }
    ///////////////
    // Functions //
    ///////////////
    static getInstance() {
        this.instance === undefined ? this.instance = new AlphaService() : null;
        return this.instance;
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
    callAlphaProject(market, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const chunks = [];
            const url = `https://us-central1-alpha-002.cloudfunctions.net/api/alpha/${symbol}`;
            yield request.post(url).on('data', response => chunks.push(response)).on('end', () => __awaiter(this, void 0, void 0, function* () {
                const json = JSON.parse(Buffer.concat(chunks).toString());
                const series = new series_model_1.Series();
                for (let key in json) {
                    json.hasOwnProperty(key) ? series.getData().push(new datapoint_model_1.Datapoint(key, json[key]['4. close'])) : null;
                }
                yield series_service_1.SeriesService.getInstance().addSeries(market, symbol, series);
                return new Promise(resolve => resolve(true));
            }));
        });
    }
}
exports.AlphaService = AlphaService;
//# sourceMappingURL=alpha-service.js.map