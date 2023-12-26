import app from './app.js'
import { PORT } from './config.js'

async function main () {
  try {
    app.listen(PORT)
    console.log(`Server is running on port ${PORT}`)
  } catch (err) {
    console.error(err)
  }
}

main()
