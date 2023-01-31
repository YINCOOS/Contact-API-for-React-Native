import express, { Request, Response } from 'express'
import { registerSchema, option, GeneratePassword, GenerateSignature, verifySignature, validatePassword, GenerateSalt, loginSchema } from '../utils/utility'
import { UserInstance, UserAttributes } from '../model/userModel'
import { JwtPayload } from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'
import { ContactAttributes, ContactInstance } from '../model/contactModel'

export const Register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, phone, email, userName, password, confirm_password } = req.body;
        const uuiduser = uuidv4();

        const validateResult = registerSchema.validate(req.body, option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            })
        }

        //generate salt
        const salt = await GenerateSalt();

        //generate password
        const userPassword = await GeneratePassword(password, salt);
        
        //check if user exist
        const User = (await UserInstance.findOne({
            where: { email: email },
        })) as unknown as UserAttributes;

        //create user
        if (!User) {
            const user = await UserInstance.create({
                id: uuiduser,
                firstName,
                lastName,
                phone,
                email,
                userName,
                password: userPassword,
                salt,
                lng:0,
                lat:0,
                verified: true,
                role:"user"
            })

            //check if user is created
            const User = (await UserInstance.findOne({
                where: { email: email },
            })) as unknown as UserAttributes;

            //generate signature
            let signature = await GenerateSignature({
                id:User.id,
                email:User.email,
                verified:User.verified,
                });

            //send signature to user for authentication
            return res.status(201).json({
                message: "User created successfully",
                signature,
                user,
                verified: User.verified
            })
           
        }
        return res.status(400).json({message: "User already exist"})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/signup"
        });
    }
}


//LOGIN USER
export const Login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const validateResult = loginSchema.validate(req.body, option);
  
      if (validateResult.error) {
        return res.status(400).json({
          Error: validateResult.error.details[0].message,
        });
      }
  
      //check if user exist
      const User = (await UserInstance.findOne({
        where: { email: email },
      })) as unknown as UserAttributes;
  
      if (User.verified === true) {
        const validation = await validatePassword(
          password,
          User.password,
          User.salt
        );
  
        if (validation) {
          //Regenerate a new signature
          let signature = await GenerateSignature({
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
    } catch (err) {
      res.status(500).json({
        Error: "Internal Server Error",
        route: "/users/login",
      });
    }
  };

  export const createContact = async (req: JwtPayload, res: Response) => {
    try {
        const id = req.User.id;
        const { firstName, lastName, phone, email, country, favorite, image } = req.body;

        //check if user exist
        const User = (await UserInstance.findOne({
            where: { id: id },
            
        })) as unknown as UserAttributes;
        console.log(User)
        const contactid = uuidv4();
        //  let images = req.files;
        if (User) {
            const createcontact = await ContactInstance.create({
                id: contactid,
                country,
                firstName,
                lastName,
                phone,
                email,
                favorite,
                userId: id,
                image: req.file.path,
            }) as unknown as ContactAttributes;

            return res.status(201).json({
                message: "Contact created successfully",
                createcontact,
            }) 
        } 
    } catch (err) {
        console.log(err)
        console.log(err)
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/contacts"
        });
    }
  }

  export const getContactsByUser = async (req: JwtPayload, res: Response) => {
    try{
        const id = req.User.id;
        console.log(id);
        
        const User = (await UserInstance.findOne({
            where: { id: id },
            attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'userName', 'role', 'verified'],
            include: [
                {
                    model: ContactInstance,
                    as: 'contacts',
                    attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'country', 'favorite', 'image'],
                }
            ]
        })) as unknown as UserAttributes;
        return res.status(200).json({
            User
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/contacts"
        });
    }
  }

  export const deleteContact = async (req: JwtPayload, res: Response) => {
    try{
        const id = req.User.id;
        const contactid = req.params.id;

        const User = (await UserInstance.findOne({
            where: { id: id },
        }) as unknown as UserAttributes);

        if (User) {
            const deletecontact = await ContactInstance.destroy({
                where: { id: contactid },
            }) as unknown as ContactAttributes;
            return res.status(200).json({
                message: "Contact deleted successfully",
                deletecontact,
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/delete-contacts"
        });
    }
  }