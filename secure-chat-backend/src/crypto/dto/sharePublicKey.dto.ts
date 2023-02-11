import { IsNotEmpty } from 'class-validator';

export class SharePublicKeyDto {
  @IsNotEmpty()
  targetedClientId: string;

  publicKey: CryptoKey;
}
