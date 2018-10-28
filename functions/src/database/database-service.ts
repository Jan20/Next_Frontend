import { fb } from '../config/firebase'

export class DatabaseService {

    ///////////////
    // Variables //
    ///////////////
    private static instance: DatabaseService
    private firestore: FirebaseFirestore.Firestore = fb.firestore()

    //////////////////
    // Constructors //
    //////////////////
    private constructor(){}

    ///////////////
    // Functions //
    ///////////////
    /**
     * 
     * Returns an instance of a Database object. Implementing
     * a singlton pattern here is pretty useful since there
     * can be only one instance of a Firebase Firestore 
     * database be used throughout the scope of a project.
     * 
     */
    public static getInstance(): DatabaseService {

        if (this.instance === undefined) {

            this.instance = new DatabaseService()

        }

        return this.instance

    }

    /////////////
    // Getters //
    /////////////
    public getFirestore(): FirebaseFirestore.Firestore {

        return this.firestore

    }

    /////////////
    // Setters //
    /////////////
    public setFirestore(firestore: FirebaseFirestore.Firestore): void {

        this.firestore = firestore

    }
}