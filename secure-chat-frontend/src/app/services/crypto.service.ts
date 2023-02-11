import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwkGeneratorResponse } from '../interfaces/JwkGeneratorResponse.interface';
import { JwkKey } from '../interfaces/JwkKey.interface';

const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private http: HttpClient) {}

  async generateKeyPair(): Promise<JwkGeneratorResponse> {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'ECDH',
        namedCurve: 'P-256',
      },
      true,
      ['deriveKey', 'deriveBits']
    );

    const publicKeyJwk: JwkKey = await window.crypto.subtle.exportKey(
      'jwk',
      keyPair.publicKey
    );

    const privateKeyJwk = await window.crypto.subtle.exportKey(
      'jwk',
      keyPair.privateKey
    );

    return {
      publicKeyJwk: publicKeyJwk,
      privateKeyJwk: privateKeyJwk,
    };
  }

  async generateDerivedKey(
    publicKeyJwk: JwkKey,
    privateKeyJwk: JwkKey
  ): Promise<CryptoKey> {
    const publicKey: CryptoKey = await window.crypto.subtle.importKey(
      'jwk',
      publicKeyJwk,
      {
        name: 'ECDH',
        namedCurve: 'P-256',
      },
      true,
      []
    );
    const privateKey: CryptoKey = await window.crypto.subtle.importKey(
      'jwk',
      privateKeyJwk,
      {
        name: 'ECDH',
        namedCurve: 'P-256',
      },
      true,
      ['deriveKey', 'deriveBits']
    );
    const derivedKey: CryptoKey = await window.crypto.subtle.deriveKey(
      { name: 'ECDH', public: publicKey },
      privateKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );

    return derivedKey;
  }

  async encryptMessage(text: string, derivedKey: CryptoKey): Promise<string> {
    const encodedText = new TextEncoder().encode(text);

    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: new TextEncoder().encode('Initialization Vector'),
      },
      derivedKey,
      encodedText
    );

    const uintArray: Uint8Array = new Uint8Array(encryptedData);

    const string = String.fromCharCode.apply(
      null,
      uintArray as unknown as number[]
    );

    const base64Data = btoa(string);
    return base64Data;
  }

  async decryptMessage(
    messageText: string,
    derivedKey: CryptoKey
  ): Promise<string> {
    try {
      const string = atob(messageText);
      const uintArray = new Uint8Array(
        [...string].map((char) => char.charCodeAt(0))
      );
      const algorithm = {
        name: 'AES-GCM',
        iv: new TextEncoder().encode('Initialization Vector'),
      };
      const decryptedData = await window.crypto.subtle.decrypt(
        algorithm,
        derivedKey,
        uintArray
      );

      return new TextDecoder().decode(decryptedData);
    } catch (e) {
      return `error decrypting message: ${e}`;
    }
  }

  getPublicKey(clientId: string): Observable<any> {
    return this.http.post(`${BASE_URL}/users/invite`, { id: clientId });
  }
}
