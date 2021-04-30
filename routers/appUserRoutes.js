// Import modules
const express       = require('express');
const approuter     = express.Router();
const CONFIG        = require('../config');
const User          = require('../models/UserSchema');
const Post          = require('../models/PostSchema');
const Comment       = require('../models/CommentSchema');

approuter.delete(CONFIG.apis.apiForProfile.delete, async (req, res) =>
{
    try
    {
        await Comment.findOneAndDelete({ "creater" : req.params.id })
        await Post.findOneAndDelete({ "creater" : req.params.id })
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ userId : req.params.id});
    }
    catch (error) {
        res.status(500).json({ message : err.message})
    }
})

approuter.get(CONFIG.apis.apiForProfile.allUsers, async (req, res) =>
{
    try 
    {
        res.status(200).send({ data : await User.find({ 'role' : 'user' }).select( { '_id' : 1, 'name' : 1, 'email' : 1, 'profileImage' : 1 } ) })
    } 
    catch (error) {
        res.status(500).json({ message : err.message})
    }
})


approuter.get(CONFIG.apis.apiForProfile.count, async (req, res) =>
{
    try 
    {
        res.status(200).send({ userCount : await (await User.find({})).length })
    } 
    catch (error) {
        res.status(500).json({ message : err.message})
    }
})

approuter.post(CONFIG.apis.apiForProfile.register, async (req, res) =>
{
    try
    {
        const user = await User.find({ email : req.body.email});
        if(user.length > 0)
        {
            res.status(400).json({ message : "Email already registered"})
        }
        else
        {
            let newUser = new User(
                {
                    name    : req.body.name,
                    email   : req.body.email,
                    address : req.body.address,
                    phone   : req.body.phone,
                    password: req.body.password,
                    profileImage : req.body.image
                }
            )
    
            newUser = await newUser.save();
            res.status(201).json({ message : "User has been created"})
        }
    }
    catch(err)
    {
        res.status(500).json({ message : err.message})
    }
    
})

approuter.post(CONFIG.apis.apiForProfile.details, async (req, res) =>
{
    try
    {
        res.json(await User.find({ _id : req.body.id}))
    }
    catch(err)
    {
        res.status(500).json({ message : err.message})
    }
})

approuter.post(CONFIG.apis.apiForProfile.signin, async (req, res) =>
{
    try
    {
        const user = await User.find({ email : req.body.email});
        if(user.length < 1)
        {
            res.status(401).json({message : "email is not registered"})
        }
        else
        {
            if(req.body.password === user[0].password)
            res.status(201).json({ 
                username : user[0].email,
                name : user[0].name,
                id : user[0]._id,
                isLoggedIn : true,
                isAdmin : user[0].role == "admin",
                role : user[0].role,
                profileImage : user[0].profileImage
            })
            else
                res.status(401).json({message : "Password does not mach"})
        }
    }
    catch(err)
    {
        res.status(500).json({ message : err.message})
    }
})


module.exports = approuter