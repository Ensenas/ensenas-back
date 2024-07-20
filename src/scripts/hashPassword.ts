import Encryption from '../utils/Encryption'

const hashPassword = async (password: string) => {
  const passwordHash = await Encryption.getInstance().hash(password)
  return passwordHash
}

if (require.main === module) {
  ;(async () => {
    const args = process.argv.slice(2)
    if (args.length !== 1) {
      console.error('Usage: node hashPassword.js <password>')
      process.exit(1)
    }

    const password = args[0]
    try {
      const hashedPassword = await hashPassword(password)
      console.log(`Hashed Password: ${hashedPassword}`)
    } catch (error) {
      console.error('Error hashing password:', error)
      process.exit(1)
    }
  })()
}
