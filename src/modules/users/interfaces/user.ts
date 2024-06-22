export interface JWTUser {
  userId: string
  username: string
}

export enum Role {
  USER = 'USER',
  COURT = 'COURT',
  ARBITER = 'ARBITER',
  DELEGATE = 'DELEGATE',
  ADMIN = 'ADMIN',
}

export interface UserInfo {
  username: string
  mail: string
  roles: string[]
}
