
const { ObjectId } = require('bson');
const express = require('express');
const approuter = express.Router();
const CONFIG = require('../config');
const Comment = require('../models/CommentSchema');


approuter.post(CONFIG.apis.apiForComment.add, async (req, res) =>
{
    try {
        let newComment = new Comment(
            {
                for_post: req.body.postId,
                content: req.body.content,
                creater: req.body.creater
            }
        )
        await newComment.save()
        res.status(200).send(
            await Comment.aggregate([
                { $match : { for_post : ObjectId(req.body.postId) } },
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "creater",
                        foreignField: "_id",
                        as: "creater_details"
                    }
                }
            ])
        );
    }
    catch (err) {
        res.status(500).json({ message: "Error occured in creating new comment", error: err.message })
    }
})

approuter.get(CONFIG.apis.apiForComment.getAll, async (req, res) =>
{
    try {
        res.status(200).send(
            await Comment.aggregate([
                { $match : { for_post : ObjectId(req.params.postId) } },
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "creater",
                        foreignField: "_id",
                        as: "creater_details"
                    }
                }
            ])
        );
    }
    catch (err) {
        res.status(500).json({ message: "Error occured while fetching posts" })
    }
})


module.exports = approuter