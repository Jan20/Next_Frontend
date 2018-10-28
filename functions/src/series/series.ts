import { Datapoint } from './datapoint'

export class Series {

    ///////////////
    // Variables //
    ///////////////
    private data: Datapoint[]

    //////////////////
    // Constructors //
    //////////////////
    public constructor(){

        this.data = []
        
    }

    ///////////////
    // Functions //
    ///////////////
    public getObject(): any {

        let timeline = new Array<{date: string, value: number}>()

        this.data.forEach(datapoint => {

            timeline.push(datapoint.getObject())

        })

        return timeline

    }

    /////////////
    // Getters //
    /////////////
    public getData(): Datapoint[] {

        return this.data

    }

    /////////////
    // Setters //
    /////////////
    public setData(data: Datapoint[]): void {

        this.data = this.data

    }

}