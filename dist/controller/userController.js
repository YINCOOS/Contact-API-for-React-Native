"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.getContactsByUser = exports.createContact = exports.Login = exports.Register = void 0;
const utility_1 = require("../utils/utility");
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const contactModel_1 = require("../model/contactModel");
const Register = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, userName, password, confirm_password } = req.body;
        const uuiduser = (0, uuid_1.v4)();
        const validateResult = utility_1.registerSchema.validate(req.body, utility_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        //generate salt
        const salt = await (0, utility_1.GenerateSalt)();
        //generate password
        const userPassword = await (0, utility_1.GeneratePassword)(password, salt);
        //check if user exist
        const User = (await userModel_1.UserInstance.findOne({
            where: { email: email },
        }));
        //create user
        if (!User) {
            const user = await userModel_1.UserInstance.create({
                id: uuiduser,
                firstName,
                lastName,
                phone,
                email,
                userName,
                password: userPassword,
                salt,
                lng: 0,
                lat: 0,
                verified: true,
                role: "user"
            });
            //check if user is created
            const User = (await userModel_1.UserInstance.findOne({
                where: { email: email },
            }));
            //generate signature
            let signature = await (0, utility_1.GenerateSignature)({
                id: User.id,
                email: User.email,
                verified: User.verified,
            });
            //send signature to user for authentication
            return res.status(201).json({
                message: "User created successfully",
                signature,
                user,
                verified: User.verified
            });
        }
        return res.status(400).json({ message: "User already exist" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/signup"
        });
    }
};
exports.Register = Register;
//LOGIN USER
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validateResult = utility_1.loginSchema.validate(req.body, utility_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        //check if user exist
        const User = (await userModel_1.UserInstance.findOne({
            where: { email: email },
        }));
        if (User.verified === true) {
            const validation = await (0, utility_1.validatePassword)(password, User.password, User.salt);
            if (validation) {
                //Regenerate a new signature
                let signature = await (0, utility_1.GenerateSignature)({
                    id: User.id,
                    email: User.email,
                    verified: User.verified,
                });
                return res.status(200).json({
                    messgae: "you have successfully logged in",
                    signature,
                    email: User.email,
                    verified: User.verified,
                    role: User.role,
                });
            }
        }
        return res.status(400).json({
            Error: "Not a verified user or invalid password",
        });
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/login",
        });
    }
};
exports.Login = Login;
const createContact = async (req, res) => {
    try {
        const id = req.User.id;
        const { firstName, lastName, phone, email, country, favorite, image } = req.body;
        //check if user exist
        const User = (await userModel_1.UserInstance.findOne({
            where: { id: id },
        }));
        console.log(User);
        const contactid = (0, uuid_1.v4)();
        //  let images = req.files;
        if (User) {
            const createcontact = await contactModel_1.ContactInstance.create({
                id: contactid,
                country,
                firstName,
                lastName,
                phone,
                email,
                favorite,
                userId: id,
                image: req.file.path,
            });
            return res.status(201).json({
                message: "Contact created successfully",
                createcontact,
            });
        }
    }
    catch (err) {
        console.log(err);
        console.log(err);
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/contacts"
        });
    }
};
exports.createContact = createContact;
const getContactsByUser = async (req, res) => {
    try {
        const id = req.User.id;
        console.log(id);
        const User = (await userModel_1.UserInstance.findOne({
            where: { id: id },
            attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'userName', 'role', 'verified'],
            include: [
                {
                    model: contactModel_1.ContactInstance,
                    as: 'contacts',
                    attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'country', 'favorite', 'image'],
                }
            ]
        }));
        return res.status(200).json({
            User
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/contacts"
        });
    }
};
exports.getContactsByUser = getContactsByUser;
const deleteContact = async (req, res) => {
    try {
        const id = req.User.id;
        const contactid = req.params.id;
        const User = await userModel_1.UserInstance.findOne({
            where: { id: id },
        });
        if (User) {
            const deletecontact = await contactModel_1.ContactInstance.destroy({
                where: { id: contactid },
            });
            return res.status(200).json({
                message: "Contact deleted successfully",
                deletecontact,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/delete-contacts"
        });
    }
};
exports.deleteContact = deleteContact;
