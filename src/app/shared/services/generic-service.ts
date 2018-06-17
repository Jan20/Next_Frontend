import { Subject } from "rxjs";

export class GenericService {

    ///////////////
    // Variables //
    ///////////////
    public inAddMode: boolean

    //////////////
    // Subjects //
    //////////////
    public inAddModeSubject: Subject<boolean>

    /////////////////
    // Constructor //
    /////////////////
    public constructor() {

        this.inAddMode = false
        this.inAddModeSubject = new Subject<boolean>()

    }

    ///////////////
    // Functions //
    ///////////////
    public toggleInAddMode(): void {
  
        this.inAddMode === false ? this.setInAddMode(true) : this.setInAddMode(false)
      
    }

    /////////////
    // Getters //
    /////////////
    public getInAddMode(): boolean {

        return this.inAddMode

    }

    /////////////
    // Setters //
    /////////////
    public setInAddMode(inAddMode: boolean): void {
  
        this.inAddMode = inAddMode
        this.inAddModeSubject.next(inAddMode)
      
    }
}