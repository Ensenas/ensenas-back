export interface JWTUser {
  userId: string
  username: string
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserInfo {
  mail: string
  username: string
  roles: string[]
}
