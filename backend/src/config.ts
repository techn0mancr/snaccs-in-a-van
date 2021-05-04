import { MONGODB_USERNAME, MONGODB_PASSWORD } from "./secrets";

const MONGODB_DATABASE_NAME = "snaccsInAVan";
const MONGODB_CONNECTION_STRING = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@snaccs-in-a-van.4ciyf.mongodb.net/snaccsInAVan?retryWrites=true&w=majority`;
const MONGODB_CONNECTION_OPTIONS = {
    dbName: MONGODB_DATABASE_NAME,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const SESSIONS_COLLECTION_NAME = "sessions";

export {
    MONGODB_CONNECTION_STRING,
    MONGODB_CONNECTION_OPTIONS,
    MONGODB_DATABASE_NAME,
    SESSIONS_COLLECTION_NAME
}
