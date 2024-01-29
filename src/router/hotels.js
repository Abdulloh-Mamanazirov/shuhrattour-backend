const express = require("express");
const multer = require("multer");
const pgp = require("pg-promise");
const path = require("path");
const fs = require("fs");

const db = pgp()(
  "postgresql://abdullohwebdev:T0gy9ofChJFD@ep-throbbing-bread-a1x3crqt.ap-southeast-1.aws.neon.tech/Travel?sslmode=require"
);

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

const upload = multer({ storage: storage });

// Create
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let { title, description, features, price, location, stars } = req.body;
    let image = req.file.filename;
    await db.none(
      "INSERT INTO hotels(image, title, description, features, price, location, stars) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [
        image,
        title,
        description,
        JSON.stringify(features.split(",")),
        price,
        location,
        parseInt(stars),
      ]
    );
    res.status(201).send("Mehmonxona qo'shildi!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Mehmonxona qo'shishda xatolik.");
  }
});

// Read
router.get("/", async (_, res) => {
  try {
    let hotel = await db.manyOrNone("SELECT * FROM hotels");
    res.send(hotel);
  } catch (error) {
    res.status(500).send("Mehmonxonalarni yuklashda xatolik.");
  }
});

// Update
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    let { title, description, features, price, location, stars } = req.body;
    let image = req.file ? req.file.filename : null;

    if (features) {
      features = JSON.stringify(features.split(",")).replaceAll("o'", "õ");
    }

    let updateFields = [];
    if (title) updateFields.push(`title = '${title}'`);
    if (description) updateFields.push(`description = '${description}'`);
    if (features) updateFields.push(`features = '${features}'`);
    if (price) updateFields.push(`price = '${price}'`);
    if (location) updateFields.push(`location = '${location}'`);
    if (stars) updateFields.push(`stars = '${stars}'`);
    if (image) updateFields.push(`image = '${image}'`);

    let setClause = updateFields.join(", ");

    await db.none(`UPDATE hotels SET ${setClause} WHERE id = ${id}`);
    res.send("Mehmonxona tahrirlandi!");
  } catch (error) {
    res.status(500).send("Mehmonxonani tahrirlashda xatolik.");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    if (req.query?.image) {
      fs.unlink(path.join("src", "uploads", req.query?.image), (err) => {
        if (err) return;
      });
    }
    await db.none("DELETE FROM hotels WHERE id = $1", [req.params.id]);
    res.send("Mehmonxona o'chirildi!");
  } catch (error) {
    res.status(500).send("Mehmonxonani o'chirishda xatolik.");
  }
});

module.exports = router;
