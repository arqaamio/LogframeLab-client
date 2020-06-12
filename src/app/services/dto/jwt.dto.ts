export class JwtDto {
  public token: string;
  public tokenType: string;
  public expiryDuration: number;
  public groups: string[];
}
