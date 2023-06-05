import app from './app'
import { startDatabase } from './database'
import "dotenv/config"

const PORT: number = parseInt(process.env.APP_PORT!) || 3000

app.listen(PORT, async () => {
    await startDatabase()
    console.log(`App running on port ${PORT}`)
})
