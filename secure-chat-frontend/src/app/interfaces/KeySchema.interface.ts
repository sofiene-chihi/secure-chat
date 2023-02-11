import { JwkKey } from './JwkKey.interface';

export interface KeySchemaInterface {
  targetPublicKey: JwkKey;
  SenderPrivateKey: JwkKey;
  targetId: string;
}
