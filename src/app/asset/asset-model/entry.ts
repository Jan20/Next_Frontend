export class Entry {
    
    ///////////////
    // Variables //
    ///////////////
    public name: string
    public symbol: string
    public value: number
    public date: any

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
    
        name: string,
        symbol: string,
        value: number,
        date: any
    
    ) {
    
        this.name = name
        this.symbol = symbol
        this.value = value
        this.date = date
    
    }

    /////////////
    // Getters //
    /////////////
    public getName(): string {
    
        return this.name
    
    }

    public getSymbol(): string {
    
        return this.symbol

    }

    public getValue(): number {

        return this.value

    }

    public getDate(): any {

        return this.date

    }

    /////////////
    // Setters //
    /////////////
    public setName(name: string): void {
    
        this.name = name
    
    }

    public setSymbol(symbol: string): void {
    
        this.symbol = symbol
    
    }

    public setValue(value: number): void {
    
        this.value = value
    
    }

    public setDate(date: any): void {
    
        this.date = date
    
    }
}