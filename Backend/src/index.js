import dotenv from "dotenv"
dotenv.config({
    path: './env'
})

import { app } from "./app.js"


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is runnning at PORT at ${process.env.PORT}`);

})