import 'dotenv/config'

console.log('TURSO_DATABASE_URL:', process.env.TURSO_DATABASE_URL ? 'Loaded' : 'Missing')
console.log('TURSO_AUTH_TOKEN:', process.env.TURSO_AUTH_TOKEN ? `Loaded (${process.env.TURSO_AUTH_TOKEN.substring(0, 10)}...)` : 'Missing')
console.log('Token Length:', process.env.TURSO_AUTH_TOKEN?.length)
