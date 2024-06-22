import * as bcrypt from 'bcrypt'

export default class Encryption {
  private static instance: Encryption | null = null

  static getInstance(): Encryption {
    if (!Encryption.instance) {
      Encryption.instance = new Encryption()
    }
    return Encryption.instance
  }

  private async _generateSalt(): Promise<string> {
    const saltRounds: number = process.env.BCRYPT_ROUNDS ? parseInt(process.env.BCRYPT_ROUNDS) : 10
    const salt = await bcrypt.genSalt(saltRounds)
    return salt
  }

  public async hash(password: string): Promise<string> {
    const salt = await this._generateSalt()
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  public async compare(passwordHashed: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(passwordHashed, hash)
  }
}
