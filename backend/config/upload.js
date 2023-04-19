// import multer from 'multer';
const multer=require("multer")
const { GridFsStorage }= require("multer-gridfs-storage")


const dotenv = require("dotenv");

dotenv.config();


const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: {useNewUrlParser: true,
    useUnifiedTopology: true},
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

const upload= multer({storage}); 
module.exports={upload}