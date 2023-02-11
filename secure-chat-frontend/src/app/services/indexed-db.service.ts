import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { JwkKey } from '../interfaces/JwkKey.interface';
import { KeySchemaInterface } from '../interfaces/KeySchema.interface';

const dbPromise = openDB('keys-store', 2, {
  upgrade(db) {
    db.createObjectStore('cryptoKeys', { keyPath: 'targetId' });
  },
});

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  constructor() {}

  async setKeys(privateKey: JwkKey, publicKey: JwkKey, targetId: string) {
    return (await dbPromise).put('cryptoKeys', {
      targetPublicKey: publicKey,
      SenderPrivateKey: privateKey,
      targetId: targetId,
    });
  }

  async getKeys(targetId: string): Promise<KeySchemaInterface> {
    let keyObject: Promise<KeySchemaInterface> = (await dbPromise).get(
      'cryptoKeys',
      targetId
    );
    return keyObject;
  }

  async delKeys(targetId: string) {
    return (await dbPromise).delete('cryptoKeys', targetId);
  }

  async clearKeys() {
    return (await dbPromise).clear('cryptoKeys');
  }
}
