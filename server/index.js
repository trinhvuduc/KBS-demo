const express = require("express");
const cors = require("cors");

const ruleBaseRoute = require("./routes/rule-base");
const caseBaseRoute = require("./routes/case-base");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/rule-base", ruleBaseRoute);
app.use("/case-base", caseBaseRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));
