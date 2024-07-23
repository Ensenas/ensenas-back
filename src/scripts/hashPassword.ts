import Encryption from '../utils/Encryption'

const hashPassword = async (password: string) => {
  const passwordHash = await Encryption.getInstance().hash(password)
  return passwordHash
}

if (require.main === module) {
  ;(async () => {
    if (process.argv[2]) {
      console.log(process.argv[2])
      const hashedPassword = await hashPassword(process.argv[2])
      console.log(hashedPassword)
    }
  })()
}
