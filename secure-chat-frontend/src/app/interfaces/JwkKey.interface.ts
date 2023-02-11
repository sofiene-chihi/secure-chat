export interface JwkKey {
  crv?: string;
  d?: string;
  ext?: boolean;
  key_ops?: string[];
  kty?: string;
  x?: string;
  y?: string;
}
