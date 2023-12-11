const {Router} = require("express")
const {postModel , PostModel} = require("../Model/post.model")

const postRouter = Router()

postRouter.post("/add" , async(req,res) =>{
    const {userID} = req.body
    try{
        const post = new postModel({...req.body, userID})
        await post.save()
        res.status(200).json({msg: "Post was added"})
    }
    catch(error){
        res.status(400).json({ error: error.message})
    }
})

postRouter.patch("/update/:postID" , async (req , res) =>{
    const {postID} = req.params
    const {userID} = req.body
    try{
        const post = await PostModel.findByIdAndUpdate(
            {userID , _id: postID},
            req.body
        )
        if(!post){
            res.status(400).json({ msg : "Post not found"})
        }else{
            res.status(200).json({msg: "Post updated"})
        }
    }catch(error){
        res.status(400).json({ error : error.message})
    }
})

postRouter.delete("/delete/:postID" , async(req,res) =>{
    const {postID} = req.params
    const {userID} = req.body
    try{
        const post = await postModel.findByIdAndDelete({ userID , _id: postID})
        if(!post){
            res.status(400).json({ msg : "Post not found"})
        }else{
            res.status(200).json({ msg: "Post deleted"})
        }
    }catch(error){
        res.status(400).json({ error : error.message})
    }
})

module.exports = {
    postRouter
}