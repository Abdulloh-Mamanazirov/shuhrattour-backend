const express = require("express");
const pgp = require("pg-promise")();

const db = pgp(
  "postgresql://abdullohwebdev:T0gy9ofChJFD@ep-throbbing-bread-a1x3crqt.ap-southeast-1.aws.neon.tech/Travel?sslmode=require"
);

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    let {
      date,
      class: flight_class,
      flight_time,
      from_place,
      from_time,
      to_place,
      to_time,
      price,
      airways,
    } = req.body;
    await db.none(
      "INSERT INTO flights(date, class, flight_time, from_place, from_time, to_place, to_time, price, airways) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        date,
        flight_class,
        flight_time,
        from_place,
        from_time,
        to_place,
        to_time,
        price,
        airways,
      ]
    );
    res.send("Parvoz qo'shildi!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Parvoz qo'shishda xatolik.");
  }
});

// Read
router.get("/", async (req, res) => {
  try {
    let flight = await db.manyOrNone("SELECT * FROM flights");
    res.send(flight);
  } catch (err) {
    console.log(err);
    res.status(500).send("Parvozlarni yuklashda xatolik.");
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    let {
      date,
      class: flight_class,
      flight_time,
      from_place,
      from_time,
      to_place,
      to_time,
      price,
      airways,
    } = req.body;
    await db.none(
      "UPDATE flights SET date = $1, class = $2, flight_time = $3, from_place = $4, from_time = $5, to_place = $6, to_time = $7, price = $8, airways = $9 WHERE id = $10",
      [
        date,
        flight_class,
        flight_time,
        from_place,
        from_time,
        to_place,
        to_time,
        price,
        airways,
        req.params.id,
      ]
    );
    res.send("Parvoz tahrirlandi!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Parvozni tashrirlashda xatolik.");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await db.none("DELETE FROM flights WHERE id = $1", [req.params.id]);
    res.send("Parvoz o'shirildi!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Parvozni o'chirishda xatolik.");
  }
});

module.exports = router;
