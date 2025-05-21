import 'dotenv/config'

const CONFIG = {
    PORT: process.env.PORT ?? 5000,
    MONGO_URL: process.env.MONGO_URL,
    SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR
}

export default CONFIG;