const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", async (req, res) => {
  const insert = await prisma.user.create({
    data: req.body,
  });
  res.json(insert);
});

app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      profile: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  res.json(users);
});

app.post("/profile", async (req, res) => {
  const insert = await prisma.profile.create({
    data: {
      ...req.body,
      user: {
        connect: {
          id: "c46a6d38-0d50-4c16-88c6-73c6d2468e0c",
        },
      },
    },
  });
  res.json(insert);
});

app.post("/post", async (req, res) => {
  const insert = await prisma.post.create({
    data: {
      ...req.body,
      postUser: {
        connect: {
          id: "c46a6d38-0d50-4c16-88c6-73c6d2468e0c",
        },
      },
    },
  });
  res.json(insert);
});

app.get("/post", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      Comment: true,
    },
  });
  res.json(posts);
});

app.post("/comment", async (req, res) => {
  const insert = await prisma.comment.create({
    data: {
      ...req.body,
      commentUser: {
        connect: {
          id: "c46a6d38-0d50-4c16-88c6-73c6d2468e0c",
        },
      },
      post: {
        connect: {
          id: "4c1c2362-a1fb-4d29-b534-ad05ce200a3b",
        },
      },
    },
  });
  res.json(insert);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
