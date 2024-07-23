const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const app = express();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static("../client/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/", "dist", "index.html"));
});

router.get("/listTask", (req, res) => {
  fs.readFile(path.join(__dirname, "/tasks.json"), (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
      return;
    }

    const tasks = JSON.parse(data);

    res.json({ tasks });
  });
});

router.post("/addTask", (req, res) => {
  const { subject, description } = req.body;
  if (!subject || !description) {
    res.status(400).send("Invalid request");
    return;
  }

  fs.readFile(path.join(__dirname, "tasks.json"), (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
      return;
    }

    const tasks = JSON.parse(data);
    tasks.push({ subject, description });

    fs.writeFile(
      path.join(__dirname, "tasks.json"),
      JSON.stringify(tasks),
      (err) => {
        if (err) {
          res.status(500).send("Internal server error");
          return;
        }
        res.json({ tasks });
      }
    );
  });
});

router.post("/editTask", (req, res) => {
  const { id, subject, description } = req.body;
  if (!id || !subject || !description) {
    res.status(400).send("Invalid request");
    return;
  }

  fs.readFile(path.join(__dirname, "tasks.json"), (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
      return;
    }

    const tasks = JSON.parse(data);
    tasks[id] = { subject, description };

    fs.writeFile(
      path.join(__dirname, "tasks.json"),
      JSON.stringify(tasks),
      (err) => {
        if (err) {
          res.status(500).send("Internal server error");
          return;
        }
        console.log(tasks);
        res.json({ tasks });
      }
    );
  });
});

router.delete("/deleteTask", (req, res) => {
  const { id } = req.body;
  if (!id && id !== 0) {
    res.status(400).send("Invalid request");
    return;
  }

  fs.readFile(path.join(__dirname, "tasks.json"), (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
      return;
    }

    const tasks = JSON.parse(data);
    tasks.splice(id, 1);

    fs.writeFile(
      path.join(__dirname, "tasks.json"),
      JSON.stringify(tasks),
      (err) => {
        if (err) {
          res.status(500).send("Internal server error");
          return;
        }
        res.json({ tasks });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
