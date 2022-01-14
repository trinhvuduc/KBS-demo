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
    age: arr[9],
  };
}

// API
router.post("/", (req, res) => {
  try {
    const body = req.body;

    // empty request
    if (!body.age) return res.status(400).json({ code: 400, message: "Invalid age" });
    if (!body.eyesight && !body.absorption && !body.eatingLevel && body.kindergarten === "khong" && !body.strength && !body.bodyMovement) {
      const defaultFile = fs.readFileSync(path.resolve(__dirname, "../data/default.csv"), { encoding: "utf-8" });
      let defaultJson = csvjson.toObject(defaultFile);
      defaultJson = defaultJson.map((item) => ({
        ...item,
        duong_chat: item.duong_chat.replace(/\./g, ',')
      }));
      let result = {
        message: "Thành công",
        data: null
      };

      // check other
      if (body.methods && body.methods.length > 0) {
        const other = {
          ...body,
          output: JSON.stringify(body.methods)
        }
        delete other.methods;
        const newCaseFile = fs.readFileSync(path.resolve(__dirname, "../data/new-case.csv"), { encoding: "utf-8" });
        let newCaseJson = newCaseFile.toString()
          .split(/\r?\n/)
          .map((item) => lineToObject(item));
        newCaseJson = newCaseJson.slice(1, -1);
        newCaseJson.push(other);
        const data = csvjson.toCSV(newCaseJson) + "\n"
        fs.writeFileSync(path.resolve(__dirname, "../data/new-case.csv"), data, { encoding: "utf-8" });
      }

      if (body.age <= 6) result.data = defaultJson[0].duong_chat;
      else if (body.age <= 12) result.data = defaultJson[1].duong_chat;
      else if (body.age <= 36) result.data = defaultJson[2].duong_chat;
      else result.data = defaultJson[3].duong_chat;
      return res.json(result);
    }

    const caseBaseFile = fs.readFileSync(path.resolve(__dirname, "../data/case-base.csv"), { encoding: "utf-8" });
    let caseBase = caseBaseFile
      .toString()
      .split(/\r?\n/)
      .map((item) => lineToObject(item));
    caseBase = caseBase.slice(1, -1);
    // caseBase = caseBase.slice(1, -8);
  
    let arr = [];
    for (const item of caseBase) {
      let ans = 0;
      let sum = 0;
      for (const key in body) {
        if (Object.hasOwnProperty.call(body, key)) {
          const element = body[key];
          if (key !== "age" && element && item[key]) {
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
    if (body.methods && body.methods.length > 0) {
      const other = {
        ...body,
        output: JSON.stringify(body.methods)
      }
      delete other.methods;
      const newCaseFile = fs.readFileSync(path.resolve(__dirname, "../data/new-case.csv"), { encoding: "utf-8" });
      let newCaseJson = newCaseFile.toString()
        .split(/\r?\n/)
        .map((item) => lineToObject(item));
      newCaseJson = newCaseJson.slice(1, -1);
      newCaseJson.push(other);
      const data = csvjson.toCSV(newCaseJson) + "\n"
      fs.writeFileSync(path.resolve(__dirname, "../data/new-case.csv"), data, { encoding: "utf-8" });
    } else {
      delete body.methods;
      body.output = foundCase.output;
      caseBase.push(body);
      const data = csvjson.toCSV(caseBase) + "\n";
      fs.writeFileSync(path.resolve(__dirname, "../data/case-base.csv"), data, { encoding: "utf-8" });
    }
  
    return res.json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error.message })
  }
});

module.exports = router;