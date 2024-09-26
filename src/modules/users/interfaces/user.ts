import { Path } from '../models/path.entity'

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
  name: string
  surname: string
  country: string
}

export interface CreatedUserProgress {
  id: string
  points: number
  path: Path
}

export interface UpdatedUserProgress {
  id: string
  points: number
  path: Path
}
