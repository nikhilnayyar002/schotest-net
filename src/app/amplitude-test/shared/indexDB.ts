import { QuestionState } from './global';
import { Question } from '../modals/question';

interface IDbItem {
    state:QuestionState;
    id:number;
}

export const QuestionStateDB =  {

    db:null,
    testID:null,
    setup:function (questions:Question[]){
        let request = window.indexedDB.open('states', 1);
        request.onerror = ()=>{
            console.log("error creating db")
        };
        request.onsuccess = ()=> {
            this.db = request.result; 
            this.applyStates(questions)
        };
    
        request.onupgradeneeded = (e:any)=> {
            let db = e.target.result;
            let objectStore = db.createObjectStore(`${this.testID}`, {
                keyPath: 'id',
                autoIncrement: false
            });
            objectStore.createIndex('state', 'state', { unique: false });
            console.log("updgraded")
        };
    },

    addData:function(state:QuestionState, id:number) {
        let newItem:IDbItem = { state , id:id};
        let transaction = this.db.transaction([`${this.testID}`], 'readwrite');
        let objectStore = transaction.objectStore(`${this.testID}`);
        var request = objectStore.add(newItem);
        request.onsuccess = function () { console.log('request succeeded') };
        transaction.oncomplete = function () {
            console.log('Transaction completed: database modification finished.');
        };
        transaction.onerror = function () { console.log('Transac.failed due to error'); };
    },

    updateData:function(state:QuestionState, id:number){
      
        var objectStore = this.db.transaction([`${this.testID}`], "readwrite").objectStore(`${this.testID}`);
        var objectStoreTitleRequest = objectStore.get(id);
        
        objectStoreTitleRequest.onsuccess = ()=> {
          var data:IDbItem = objectStoreTitleRequest.result;
          if(!data) return this.addData(state, id); 
          data.state = state;
          var updateRequest = objectStore.put(data);
        
          updateRequest.onsuccess = function() {
            console.log("updated")
          };
        };
    },

    applyStates:function(questions:Question[]) {
        let objectStore = this.db.transaction(`${this.testID}`).objectStore(`${this.testID}`);
        objectStore.openCursor().onsuccess = (e:any)=> {
            // Get a reference to the cursor
            let cursor:IDBCursorWithValue = e.target.result;
            if (cursor) {
                questions[cursor.value.id-1].state = cursor.value.state;
                cursor.continue();
            }
            else ;
        };
    }
    
};











