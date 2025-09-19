const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Use env variable for MongoDB
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://karthikthangaduraik_db_user:12345@cluster0.b6iojfq.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const credential = mongoose.model("credential", {}, "bulkmail");

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 Bulkmail Backend is running...");
});

app.post("/sendemail", async (req, res) => {
  try {
    let { msg, emailList } = req.body;

    const data = await credential.find();
    if (!data || data.length === 0) {
      return res.status(500).json({ error: "No credentials found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: data[0].user,
        pass: data[0].pass,
      },
    });

    for (let i = 0; i < emailList.length; i++) {
      await transporter.sendMail({
        from: data[0].user,
        to: emailList[i],
        subject: "A message from Bulk Mail App",
        text: msg,
      });
      console.log("📧 Email sent to:", emailList[i]);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Email sending error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
