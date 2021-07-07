const express = require("express");
const knex = require("knex");

const db = require("../data/dbConfig.js");

const dbConnection = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/budget.db3"
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection("accounts")
    .then(tbl => {
      res.status(200).json(tbl);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const account = req.body;

  dbConnection("accounts")
    .insert(account, "id")
    .then(arrayOfIds => {
      const idOfLastRecordInserted = arrayOfIds[0];
      res.status(201).json(idOfLastRecordInserted);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) were updated` });
      } else {
        res.status(404).json({ message: "No records found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) were deleted` });
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
