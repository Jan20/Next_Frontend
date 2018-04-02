export class User {

    ///////////////
    // Variables //
    ///////////////
    public userId: string;
    public email: string;
    public photoURL?: string;
    public displayName?: string;
  
    //////////////////
    // Constructors //
    //////////////////
    public constructor(
        
        userId: string, 
        email: string, 
        photoURL?: string,
        displayName?: string,
    
    ) {

        this.userId = userId;
        this.email = email;
        this.photoURL = photoURL;
        this.displayName = displayName;

    }

    /////////////
    // Getters //
    /////////////
    // public getUid(): string {

    //     return this.uid;

    // }

    // public getEmail(): string {

    //     return this.email;

    // }

    // public getName(): string {

    //     return this.name;

    // }

    /////////////
    // Setters //
    /////////////
    // public setUid(uid: string): void {

    //     this.uid = uid;

    // }

    // public setEmail(email: string): void {

    //     this.email = email;

    // }

    // public setName(name: string): void {

    //     this.name = name;

    // }

}
