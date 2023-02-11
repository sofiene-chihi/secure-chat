import { Injectable } from '@nestjs/common';
import { JwkGeneratorResponse } from './interfaces/JwkGeneratorResponse.interface';
import { JwkKey } from './interfaces/JwkKey.interface';

@Injectable()
export class CryptoService {
  async generateKeyPair(): Promise<JwkGeneratorResponse> {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'ECDH',
        namedCurve: 'P-256',
      },
      true,
      ['deriveKey', 'deriveBits'],
    );

    const publicKeyJwk: JwkKey = await window.crypto.subtle.exportKey(
      'jwk',
      keyPair.publicKey,
    );

    const privateKeyJwk = await window.crypto.subtle.exportKey(
      'jwk',
      keyPair.privateKey,
    );

    return {
      publicKeyJwk: publicKeyJwk,
      privateKeyJwk: privateKeyJwk,
    };
  }

  async generateDerivedKey(
    publicKeyJwk: JwkKey,
    privateKeyJwk: JwkKey,
  ): Promise<CryptoKey> {
    const publicKey: CryptoKey = await window.crypto.subtle.importKey(
      'jwk',
      publicKeyJwk,
      {
        name: 'ECDH',
        namedCurve: 'P-256',
      },
      true,
      [],
    );

    const privateKey: CryptoKey = await window.crypto.subtle.importKey(
      'jwk',
      privateKeyJwk,
      {
        name: 'ECDH',
        namedCurve: 'P-256',
      },
      true,
      ['deriveKey', 'deriveBits'],
    );

    const derivedKey: CryptoKey = await window.crypto.subtle.deriveKey(
      { name: 'ECDH', public: publicKey },
      privateKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt'],
    );
    return derivedKey;
  }
}
