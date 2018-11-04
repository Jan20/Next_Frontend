"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../config/firebase");
class DatabaseService {
    //////////////////
    // Constructors //
    //////////////////
    constructor() {
        this.firestore = firebase_1.fb.firestore();
    }
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
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new DatabaseService();
        }
        return this.instance;
    }
    /////////////
    // Getters //
    /////////////
    getFirestore() {
        return this.firestore;
    }
    /////////////
    // Setters //
    /////////////
    setFirestore(firestore) {
        this.firestore = firestore;
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database-service.js.map