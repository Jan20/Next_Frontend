import { auth } from "firebase/app"
import { concat } from "rxjs/operator/concat"

export class Quote {

    ///////////////
    // Variables //
    ///////////////
    public id: string
    public author: string
    public category: string
    public quote: string
    public score: number = 0

    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        
        id: string,
        author: string,
        category: string,
        quote: string, 
        score: number
    
    ) {

        this.id = id
        this.author = author
        this.category = category
        this.quote = quote
        this.score = score

    }

    /////////////
    // Getters //
    /////////////
    public getId(): string {

        return this.id

    }

    public getAuthor(): string {

        return this.author

    }

    public getCategory(): string {

        return this.category

    }

    public getQuote(): string {

        return this.quote

    }

    public getScore(): number {

        return this.score

    }

    /////////////
    // Setters //
    /////////////
    public setId(id: string): void {

        this.id = id

    }

    public setAuthor(author: string): void {

        this.author = author

    }

    public setCategory(category: string): void {

        this.category = category

    }


    public setQuote(quote: string): void {

        this.quote = quote

    }

    public setScore(score: number): void {

        this.score = score

    }

}