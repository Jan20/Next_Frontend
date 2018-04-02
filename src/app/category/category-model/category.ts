export class Category {

    ///////////////
    // Variables //
    ///////////////
    public name: string
    public colorScheme: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        name: string,
        colorScheme: string

    ) {

        this.name = name
        this.colorScheme = colorScheme

    }

    /////////////
    // Getters //
    /////////////
    public getName(): string {

        return name

    }

    public getColorScheme(): string {

        return this.colorScheme

    }

    /////////////
    // Setters //
    /////////////
    public setName(name: string): void {

        this.name = name

    }

    public setColorScheme(colorScheme: string): void {

        this.colorScheme = colorScheme

    }

}