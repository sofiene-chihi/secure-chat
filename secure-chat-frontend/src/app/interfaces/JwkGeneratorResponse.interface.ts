import { JwkKey } from './JwkKey.interface';

export interface JwkGeneratorResponse {
  publicKeyJwk: JwkKey;
  privateKeyJwk: JwkKey;
}
