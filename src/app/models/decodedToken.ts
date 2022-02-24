export interface DecodedToken{
  Token: string | null;
  DecodedToken:string;
  Expiration: number;
  Name: string;
  Role: string;
  Roles: string[];
  Email: string;
  UserId: number;
}
