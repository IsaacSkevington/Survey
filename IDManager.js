class IDManager{
    static currentID = 0;

    static getID(){
        return this.currentID++;    
    }
}