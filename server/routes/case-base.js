const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const csvjson = require("csvjson");
const { MASS, SIMILARTITY } = require("../lib/constant");

const lineToObject = (line) => {
  const arr = line.split(",");
  return {
    heightCondition: arr[0],
    weightCondition: arr[1],
    eyesight: arr[2],
    absorption: arr[3],
    eatingLevel: arr[4],
    kindergarten: arr[5],
    strength: arr[6],
    bodyMovement: arr[7],
    output: arr[8],
  };
}

// API
router.post("/", (req, res) => {
  try {
    // File
    const caseBaseFile = fs.readFileSync(path.resolve(__dirname, "../data/case-base.csv"), { encoding: "utf-8" });
    let caseBase = caseBaseFile
      .toString()
      .split(/\r?\n/)
      .map((item) => lineToObject(item));
    caseBase = caseBase.slice(1, -1);
    // caseBase = caseBase.slice(1, -8);

    const body = req.body;
  
    let arr = [];
    for (const item of caseBase) {
      let ans = 0;
      let sum = 0;
      for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
          const element = body[key];
          if (element && item[key]) {
            const sampleStatus = element;
            const chosenStatus = item[key];
            console.log(key + " " + sampleStatus + " " + chosenStatus + ": " + SIMILARTITY[key][sampleStatus][chosenStatus]);
            sum += MASS[key];
            ans += MASS[key] * SIMILARTITY[key][sampleStatus][chosenStatus];
          }
        }
      }
      console.log("sum: " + sum);
      console.log("ans: " + ans);
      arr.push(ans / sum);
      console.log("---");
    }
    const maxElement = Math.max(...arr);
    const index = arr.findIndex((item) => item === maxElement);
    const foundCase = caseBase[index];
    console.log(maxElement, foundCase);
  
    const result = {
      message: "Thành công",
      data: foundCase.output,
    }

    // save case
    if (!body.other) {
      delete body.other;
      body.output = foundCase.output;
      caseBase.push(body);
      const data = csvjson.toCSV(caseBase) + "\n";
      fs.writeFileSync(path.resolve(__dirname, "../data/case-base.csv"), data, { encoding: "utf-8" });
    } else {
      const data = csvjson.toCSV(body) + "\n";
      fs.writeFileSync(path.resolve(__dirname, "../data/new-case.csv"), data, { encoding: "utf-8" });
    }
  
    return res.json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error.message })
  }
});

module.exports = router;