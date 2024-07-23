const express = require("express");
const path = require("path");
const router = express.Router();
const app = express();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(express.static("../client/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/", "dist", "index.html"));
});

router.get("/search", (req, res) => {
  const title = req.query.title;

  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzk4NzllMWE4ZTVjOWNhNjk2YjMyNzlkMmE1ZTdiYyIsInN1YiI6IjY2Njg2OWJjZjc3ODE5NjNmMjhiNzNmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3FCViJcq9JieoPFG7sH_-70swYDgNgCRWYlSCqgAZHc",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.json(json);
    })
    .catch((err) => res.json({ error: err }));
});

router.get("/search/similar", (req, res) => {
  const movie_id = req.query.movie_id;

  const url = `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzk4NzllMWE4ZTVjOWNhNjk2YjMyNzlkMmE1ZTdiYyIsInN1YiI6IjY2Njg2OWJjZjc3ODE5NjNmMjhiNzNmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3FCViJcq9JieoPFG7sH_-70swYDgNgCRWYlSCqgAZHc",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.json(json);
    })
    .catch((err) => res.json({ error: err }));
});

router.get("/list", (req, res) => {
  const list_type = req.query.list_type;

  if (
    list_type !== "popular" &&
    list_type !== "top_rated" &&
    list_type !== "upcoming" &&
    list_type !== "now_playing"
  ) {
    res.json({ error: "Invalid list type" });
    return;
  }

  const url = `https://api.themoviedb.org/3/movie/${list_type}?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzk4NzllMWE4ZTVjOWNhNjk2YjMyNzlkMmE1ZTdiYyIsInN1YiI6IjY2Njg2OWJjZjc3ODE5NjNmMjhiNzNmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3FCViJcq9JieoPFG7sH_-70swYDgNgCRWYlSCqgAZHc",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.json(json);
    })
    .catch((err) => res.json({ error: err }));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
