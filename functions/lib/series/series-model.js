"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Series {
    //////////////////
    // Constructors //
    //////////////////
    constructor() { }
    ///////////////
    // Functions //
    ///////////////
    getObject() {
        let object = new Array();
        this.data.forEach(datapoint => {
            object.push(datapoint.getObject());
        });
        return object;
    }
    /////////////
    // Getters //
    /////////////
    getData() {
        return this.data;
    }
    /////////////
    // Setters //
    /////////////
    setData(data) {
        this.data = this.data;
    }
}
exports.Series = Series;
//# sourceMappingURL=series-model.js.map