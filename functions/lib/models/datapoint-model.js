"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Datapoint {
    //////////////////
    // Constructors //
    //////////////////
    constructor(date, value) {
        this.date = date;
        this.value = value;
    }
    ///////////////
    // Functions //
    ///////////////
    getObject() {
        return {
            date: this.date,
            value: this.value
        };
    }
    /////////////
    // Getters //
    /////////////
    getDate() {
        return this.date;
    }
    getValue() {
        return this.value;
    }
    /////////////
    // Setters //
    /////////////
    setDate(date) {
        this.date = date;
    }
    setValue(value) {
        this.value = value;
    }
}
exports.Datapoint = Datapoint;
//# sourceMappingURL=datapoint-model.js.map