import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Content, LinkModel, User } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

// Signup route
app.post("/api/v1/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    await User.create({ email, password });
    res.json({ message: "Signed up successfully" });
  } catch (e) {
    res.status(411).json({ error: e });
  }
});

// Signin route
app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res
        .status(403)
        .json({ message: "Email and password both are required" });
      return
    }

    if (password.length < 8) {
      res
        .status(400)
        .json({ message: "Password should be at least 8 characters long" });
      return
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      const token = jwt.sign({ id: findUser._id }, JWT_SECRET);
      res.json({
        token,
        message: "Signed in successfully",
      });
    } else {
      res.status(403).json({ message: "Incorrect credentials" });
    }
  } catch (e) {
    res.status(403).json({ message: "Error in signin handler" });
  }
});

// Add content route
app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  const { title, link,type } = req.body;

  try {
    await Content.create({
      title,
      link,
      type,
      tags: [],
      userId: req.userId,
    });

    res.json({ message: "Content added" });
  } catch (e) {
    res.status(500).json({ message: "Failed to add content" });
  }
});

// Get content route
app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const content = await Content.find({ userId }).populate("userId", "email");

    res.json({ content });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch content" });
  }
});

// Delete content route
app.delete("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  const { contentId } = req.body;

  try {
    await Content.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete content" });
  }
});

app.post("/api/v1/brain/share",userMiddleware,async(req: Request,res: Response)=>{
  const share = req.body.share;
  if(share){

    const existinguser = await LinkModel.findOne({
      userId: req.userId
    })
    if(existinguser){
      res.json({
        hash: existinguser.hash
      })
      return
    }
    const hash = random(10)
    await LinkModel.create({
      userId: req.userId,
      hash: hash
    })
    res.json({
      hash
    })
  }else{
    await LinkModel.deleteOne({
      userId:req.userId
    })  
  }
  res.json({message: "updated sharable link"})
})

app.post("/api/v1/brain/:shareLink",async (req: Request,res: Response)=>{
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash
  })
  if(!link){
    res.json({
      message: "invalid link"
    })
    return
  }

  const allContent = await Content.find({
    userId: link.userId
  })
  const user = await User.findOne({
    _id:link.userId
  })
  if(!user){
    res.json({
      message: "user does not exist"
    })
    return
  }
  res.json({
    email: user.email,
    allContent
  })

})

// Start server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

