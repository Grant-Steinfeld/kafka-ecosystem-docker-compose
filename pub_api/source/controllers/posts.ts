/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

import { Post } from "../interfaces";
import { publish } from "../services/broadcast";

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body

  let postInt: Post = {
    title: req.body.title,
    body: req.body.body,
    id: 1,
    userId: 100
  };

  await publish(postInt);

  // return response
  return res.status(200).json({
    message: "published?",
  });
};

export default { addPost };
