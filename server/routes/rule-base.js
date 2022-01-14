const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { WEIGHT_CONDITION, HEIGHT_CONDITON } = require("../lib/constant");

const lineToObject = (line) => {
  const arr = line.split(",");
  return {
    age: Number(arr[0]),
    gender: arr[1],
    weight1: Number(arr[2]),
    weight2: Number(arr[3]),
    weight3: Number(arr[4]),
    weight4: Number(arr[5]),
    height1: Number(arr[7]),
    height2: Number(arr[8])
  };
};

const findByAgeAndGender = (physicalCondition, age, gender) => physicalCondition.find((item) => item.age == age && item.gender == gender);

const findByWeightAndHeight = (physical, weight, height) => {
  let weightCondition = null;
  if (weight <= physical.weight1) weightCondition = WEIGHT_CONDITION[0];
  else if (weight <= physical.weight2) weightCondition = WEIGHT_CONDITION[1];
  else if (weight <= physical.weight3) weightCondition = WEIGHT_CONDITION[2];
  else if (weight <= physical.weight4) weightCondition = WEIGHT_CONDITION[3];
  else weightCondition = WEIGHT_CONDITION[4];

  let heightCondition = null;
  if (height <= physical.height1) heightCondition = HEIGHT_CONDITON[0];
  else if (height <= physical.height2) heightCondition = HEIGHT_CONDITON[1];
  else heightCondition = HEIGHT_CONDITON[2];

  return {
    message: "Thành công",
    weightCondition,
    heightCondition
  }
}

// API
router.post("/", (req, res) => {
  try {
    // File
    const physicalFile = fs.readFileSync(path.resolve(__dirname, "../data/rule.csv"), { encoding: "utf-8" });
    let physicalCondition = physicalFile
      .toString()
      .split(/\r?\n/)
      .map((item) => lineToObject(item));
    physicalCondition = physicalCondition.slice(1, -1);

    const { age, gender, weight, height } = req.body;
    if (!age || !gender || !weight || !height)
      return res.status(400).json({ code: 400, message: "Invalid input" });
    
    // find by age and gender
    let physical = null;
    if (age <= 24) physical = findByAgeAndGender(physicalCondition, age, gender);
    else if (age <= 30) physical = findByAgeAndGender(physicalCondition, 30, gender);
    else if (age <= 36) physical = findByAgeAndGender(physicalCondition, 36, gender);
    else if (age <= 42) physical = findByAgeAndGender(physicalCondition, 42, gender);
    else if (age <= 48) physical = findByAgeAndGender(physicalCondition, 48, gender);
    else if (age <= 54) physical = findByAgeAndGender(physicalCondition, 54, gender);
    else physical = findByAgeAndGender(physicalCondition, 60, gender);
  
    // get physical condition
    let result = findByWeightAndHeight(physical, weight, height);
    result.case = {
      age: age,
      gender: gender,
      height: height,
      weight: weight,
    }
  
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ code: 500, message: error.message })
  }
});

module.exports = router;