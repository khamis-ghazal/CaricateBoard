const registerRouter = require('./register-routes');
const express = require("express");
const app = express();

app.use(express.json());
app.use(registerRouter);


const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server On at http://localhost:${PORT}`));