const Likes = require("../models/Likes");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/:id", verifyToken, async (req, res) => {
  try {
    const like = new Likes({
      userId: req.user.id,
      productId: req.params.id,
    });

    const newLike = await like.save();
    res.status(200).json(newLike);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Likes.findOneAndDelete({
      userId: req.user.id,
      productId: req.params.id,
    });
    res.status(200).json("Like has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyToken, async (req, res) => {
  try {
    const likes = await Likes.find({
      userId: req?.user?.id,
    });
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
