export class Datapoint {

    ///////////////
    // Variables //
    ///////////////
    private date: string
    private value: number

    //////////////////
    // Constructors //
    //////////////////
    public constructor(date: string, value: number){

        this.date = date
        this.value = value

    }

    ///////////////
    // Functions //
    ///////////////
    public getObject(): {date: string, value: number} {

        return { 
            
            date: this.date,
            value: this.value

        }

    }

    /////////////
    // Getters //
    /////////////
    public getDate(): string {

        return this.date

    }

    public getValue(): number {

        return this.value

    }

    /////////////
    // Setters //
    /////////////
    public setDate(date: string): void {

        this.date = date

    }

    public setValue(value: number): void {

        this.value =value

    }

}