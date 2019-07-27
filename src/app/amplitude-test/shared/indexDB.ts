import { QuestionState } from "./global";
import { UserQuestion } from '../modals/question';

interface IDbItem {
  state: QuestionState;
  id: string;
}

export const QuestionStateDB = {
  db: null,
  testID: null,
  setup: function(questions: { [index: string]: UserQuestion }) {
    let request = window.indexedDB.open("states");
    request.onerror = () => {
      console.log("error creating db");
    };
    request.onsuccess = () => {
      this.db = request.result;
      this.applyStates(questions);
    };

    request.onupgradeneeded = (e: any) => {
      let db = e.target.result;
      let objectStore = db.createObjectStore(this.testID, {
        keyPath: "id",
        autoIncrement: false
      });
      objectStore.createIndex("state", "state", { unique: false });
      console.log("updgraded");
    };
  },

  addData: function(state: QuestionState, id: string) {
    let newItem: IDbItem = { state, id: id };
    let transaction = this.db.transaction([this.testID], "readwrite");
    let objectStore = transaction.objectStore(this.testID);
    var request = objectStore.add(newItem);
    request.onsuccess = function() {
      console.log("request succeeded");
    };
    transaction.oncomplete = function() {
      console.log("Transaction completed: database modification finished.");
    };
    transaction.onerror = function() {
      console.log("Transac.failed due to error");
    };
  },

  updateData: function(state: QuestionState, id: string) {
    var objectStore = this.db
      .transaction([this.testID], "readwrite")
      .objectStore(this.testID);
    var objectStoreTitleRequest = objectStore.get(id);

    objectStoreTitleRequest.onsuccess = () => {
      var data: IDbItem = objectStoreTitleRequest.result;
      if (!data) return this.addData(state, id);
      data.state = state;
      var updateRequest = objectStore.put(data);

      updateRequest.onsuccess = function() {
        console.log("updated");
      };
    };
  },

  applyStates: function(questions:{ [index: string]: UserQuestion }) {
    let found = false;
    for (let i of Array.from((<IDBDatabase>this.db).objectStoreNames))
      if (i == this.testID) {
        found = true;
        break;
      }
    if (!found) this.createObjectStore(this.testID)
    else {
      let objectStore = this.db.transaction(this.testID).objectStore(this.testID);
      objectStore.openCursor().onsuccess = (e: any) => {
        // Get a reference to the cursor
        let cursor: IDBCursorWithValue = e.target.result;
        if (cursor) {
          questions[cursor.value.id].state = cursor.value.state;
          cursor.continue();
        } else;
      };
    }
  },
  createObjectStore: function(storeName) {
      this.db.close();
      var requestVersion:IDBOpenDBRequest = indexedDB.open(this.db.name, this.db.version + 1);
      requestVersion.onupgradeneeded = (e) =>{
        this.db = (<any>e.target).result
        var objectStore = this.db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: false
        });
        objectStore.createIndex("state", "state", { unique: false });
      };
      requestVersion.onerror = ()  => console.log(`Error: createObjectStore:${storeName}`);
      requestVersion.onblocked = ()  => console.log(`Blocked: createObjectStore:${storeName}`);
  }
};
