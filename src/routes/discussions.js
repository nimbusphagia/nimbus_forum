import { Router } from "express";
import { validationResult } from "express-validator";
import { discussionGet, discussionsGet, newGet, newPost, commentPost } from "../controllers/discussions.js";
import { createDiscussionValidator } from "../validators/discussionValidators.js";


const discussionsRoute = new Router();
// Parent
discussionsRoute.get('/discussions', discussionsGet);

// Create discussion
discussionsRoute.get('/discussions/new', newGet);

discussionsRoute.post(
  "/discussions/new",
  createDiscussionValidator,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("new-discussion", {
        errors: errors.array(),
        oldData: req.body
      });
    }

    next();
  },
  newPost
);

// View discussion
discussionsRoute.get("/discussions/:id", discussionGet);
discussionsRoute.post('/discussions/comment', commentPost);


export default discussionsRoute;
