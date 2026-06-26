import app from "./app.js";

import { connectDb } from "./config/db.js";

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

connectDb(DB_URL);

app.listen(PORT, () => {
    console.log("The server is listening on port ", PORT);
});
