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
const stock_model_1 = require("./stock-model");
class StockService {
    ///////////////
    // Functions //
    ///////////////
    getStocks(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(marketId);
            const stocks = [];
            yield database_service_1.DatabaseService.getInstance().getFirestore().collection(`/markets/${marketId}/assets`).get().then(newStocks => {
                newStocks.forEach(stock => console.log(stock.data()));
                newStocks.forEach(stock => stocks.push(new stock_model_1.Stock(stock.data().symbol, stock.data().name, stock.data().market_id)));
            });
            return new Promise(resolve => resolve(stocks));
        });
    }
}
exports.StockService = StockService;
//# sourceMappingURL=stock-service.js.map