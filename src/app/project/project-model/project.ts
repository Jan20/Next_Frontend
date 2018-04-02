export class Project{

    ///////////////
    // Variables //
    ///////////////
    public id: string
    public name: string
    public category: string
    public state: string

    //////////////////
    // Constructors //
    //////////////////
    public constructor(

        id: string,
        name: string,
        category: string,
        state: string

    ) {

        this.id = id
        this.name = name
        this.category = category
        this.state = state

    }

    /////////////
    // Getters //
    /////////////
    public getId(): string {

        return this.id

    }

    public getName(): string {

        return this.name

    }

    public getCategory(): string {

        return this.category

    }

    public getState(): string {

        return this.state

    }

    /////////////
    // Setters //
    /////////////
    public setId(id: string): void {

        this.id = id

    }

    public setName(name: string): void {

        this.name = name

    }

    public setCategory(category: string): void {

        this.category = category

    }

    public setState(state: string): void {

        this.state = state

    }
    

}