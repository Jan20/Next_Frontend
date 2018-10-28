"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Series {
    //////////////////
    // Constructors //
    //////////////////
    constructor() {
        this.data = [];
    }
    ///////////////
    // Functions //
    ///////////////
    getObject() {
        let timeline = new Array();
        this.data.forEach(datapoint => {
            timeline.push(datapoint.getObject());
        });
        return timeline;
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
//# sourceMappingURL=series.js.map