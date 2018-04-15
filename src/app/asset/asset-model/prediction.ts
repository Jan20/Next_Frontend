export class Prediction{

    ///////////////
    // Variables //
    ///////////////
    public date: any
    public predicted_close: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(date: any, predicted_close: number) {
        this.date = date
        this.predicted_close = predicted_close
    }

    /////////////
    // Getters //
    /////////////
    public getDate(): any {
        return this.date
    }

    public getPredictedClose(): number {
        return this.predicted_close
    }

    /////////////
    // Setters //
    /////////////
    public setDate(date: any): void {
        this.date = date
    }

    public setPredictedClose(predicted_close: number): void {
        this.predicted_close = predicted_close
    }
}