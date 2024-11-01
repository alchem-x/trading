import { config } from 'dotenv'

config()

export const APP_PORT = process.env.PORT ?? 3000
export const SNOWBALL_TOKEN = process.env.SNOWBALL_TOKEN
export const BARK_API = process.env.BARK_API
