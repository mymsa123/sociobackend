const mongoose = require("mongoose");

let PostModel;

try {
  
  PostModel = mongoose.model("post");
} catch (e) {
  
  const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userID: String,
  });

  PostModel = mongoose.model("post", postSchema);
}

module.exports = {
  PostModel,
};
