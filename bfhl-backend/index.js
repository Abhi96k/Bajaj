import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST Method: /bfhl
app.post("/bfhl", (req, res) => {
  const userId = "john_doe_17091999"; // Replace with dynamic user ID if needed
  const email = "john@xyz.com"; // Replace with dynamic email if needed
  const rollNumber = "ABCD123"; // Replace with dynamic roll number if needed

  if (!req.body.data) {
    return res.status(400).json({
      is_success: false,
      user_id: userId,
      email,
      roll_number: rollNumber,
      numbers: [],
      alphabets: [],
      highest_lowercase_alphabet: [],
    });
  }

  const data = req.body.data;
  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = "";

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item >= "a" && item <= "z" && item > highestLowercaseAlphabet) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  const highestLowercaseAlphabetArray = highestLowercaseAlphabet
    ? [highestLowercaseAlphabet]
    : [];

  res.status(200).json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabetArray,
  });
});

// GET Method: /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
