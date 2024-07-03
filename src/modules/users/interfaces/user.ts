export interface JWTUser {
  userId: string
  username: string
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserInfo {
  username: string
  mail: string
  roles: string[]
}
