"use strict";
//this is the configursation for multer to upload images
//needed to upload files and storing the image in any format you want (jpeg, png, etc)
//install yarn add cloudinary multer multer-storage-cloudinary
//install yarn add -D @types/multer @types/multer-storage-cloudinary
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary = require('cloudinary').v2;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Contact',
            // allowed_formats:['jpg, png, jpeg'],
            // unique_filename: true,
        };
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
//the upload variabel will now be used as a middleware in the controller (update route) to upload images
//if you want to upload multiple images, you have to use the upload.array('images', 5) middleware
