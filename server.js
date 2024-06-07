const PORT = 3000;
const express = require("express");
//const cors = require("cors");
const app = express();
//app.use(cors());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

app.post("/gemini", async (req, res) => {
  console.log(req.body.history);
  console.log(req.body.message);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: req.body.history,
  });
  const mgs = req.body.message;
  const result = await chat.sendMessage(mgs);
  const response = result.response;
  const text = response.text();
  res.send(text);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
