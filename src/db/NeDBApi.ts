import Datastore from 'nedb';

interface DbApi<T> {
  insert(data:T):Promise<boolean>;
  update(query:Partial<T>, data:Partial<T>):Promise<boolean>;
  remove(query:Partial<T>):Promise<number>;
  find(query:Partial<T>):Promise<T[]>;
  insertBulk(dataArray:T[]):Promise<boolean>;
  removeBulk(queryArray:Partial<T>[]):Promise<number[]>;
}


export class NeDBApi<T> implements DbApi<T> {
  private db: Datastore;

  constructor(filename:string) {
    console.log(filename)
    this.db= new Datastore({  filename, autoload: true });
    this.db.persistence.setAutocompactionInterval(60000) // ms
  }

  async insert(data:T):Promise<boolean> {
    return new Promise((resolve, reject)  => {
      this.db.insert(data, (err:Error |null)  => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async update(query:Partial<T>, data:Partial<T>):Promise<boolean> {
    return new Promise((resolve, reject)  => {
      this.db.update(query, { $set: data }, {}, (err:Error |null,  numAffected: number) => {
        if (err) {
          reject(false);
        } else {
          resolve(numAffected> 0);
        }
      });
    });
  }

  async remove(query:Partial<T>):Promise<number> {
    return new Promise((resolve, reject)  => {
      this.db.remove(query, { multi: true }, (err:Error |null,  numRemoved: number) => {
        if (err) {
          reject(0);
        } else {
          resolve(numRemoved);
        }
      });
    });
  }

  async find(query:Partial<T>):Promise<T[]> {
    return new Promise((resolve, reject)  => {
      this.db.find(query, (err:Error |null,  docs: T[]) => {
        if (err) {
          reject([]);
        } else {
          resolve(docs);
        }
      });
    });
  }

  async insertBulk(dataArray:T[]):Promise<boolean> {
    return new Promise((resolve, reject)  => {
      this.db.insert(dataArray, (err:Error |null)  => {
        if (err) {
          reject(err);
        } else {
          resolve(true)
        }
      });
    });
  }

  async removeBulk(queryArray:Partial<T>[]):Promise<number[]> {
    return Promise.all(queryArray.map(query=>
      new Promise<number>((resolve, reject)  => {
        this.db.remove(query, { multi: true }, (err:Error |null,  numRemoved: number) => {
          if (err) {
            reject(err);
          } else {
            resolve(numRemoved);
          }
        });
      })
    ));
  }

}