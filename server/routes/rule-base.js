const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

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

const findByAgeAndGender = (age, gender) => physicalCondition.find((item) => item.age == age && item.gender == gender);

const findByWeightAndHeight = (physical, weight, height) => {
  let weightCondition = null;
  if (weight <= physical.weight1) weightCondition = "thieu_can";
  else if (weight <= physical.weight2) weightCondition = "nguy_co_thieu_can";
  else if (weight <= physical.weight3) weightCondition = "binh_thuong";
  else if (weight <= physical.weight4) weightCondition = "nguy_co_thua_can";
  else weightCondition = "thua_can";

  let heightCondition = null;
  if (height <= physical.height1) heightCondition = "thap";
  else if (height <= physical.height2) heightCondition = "binh_thuong";
  else heightCondition = "cao";

  return {
    message: "Thành công",
    weightCondition,
    heightCondition
  }
}

// File
const physicalFile = fs.readFileSync(path.resolve(__dirname, "../data/rule.csv"));
const physicalCondition = physicalFile
  .toString()
  .split(/\r?\n/)
  .map((item) => lineToObject(item));

// API
router.post("/", (req, res) => {
  try {
    const { age, gender, weight, height } = req.body;
    if (!age || !gender || !weight || !height)
      return res.status(400).json({ code: 400, message: "Invalid input" });
    
    // find by age and gender
    let physical = null;
    if (age <= 24) physical = findByAgeAndGender(age, gender);
    else if (age <= 30) physical = findByAgeAndGender(30, gender);
    else if (age <= 36) physical = findByAgeAndGender(36, gender);
    else if (age <= 42) physical = findByAgeAndGender(42, gender);
    else if (age <= 48) physical = findByAgeAndGender(48, gender);
    else if (age <= 54) physical = findByAgeAndGender(54, gender);
    else physical = findByAgeAndGender(60, gender);
  
    // get physical condition
    const result = findByWeightAndHeight(physical, weight, height);
  
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message })
  }
});

module.exports = router;