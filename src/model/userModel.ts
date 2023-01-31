import {DataTypes, Model} from 'sequelize';
import {db} from '../config/index';
import { ContactInstance } from './contactModel';

export interface UserAttributes {
    id: string;
    userName:string;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    salt:string;
    phone:string;
    lng:number;
    lat:number;
    verified:boolean;
    role:string;
    
}

export class UserInstance extends Model<UserAttributes>{}


UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:"Email is required"
            },
            isEmail:{
                msg:"Provide a valid email"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Password is required"
            },
            notEmpty:{
                msg:"Password is required"
            }
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull:true    
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull:true
    },
        userName: {
        type: DataTypes.STRING,
        allowNull:true
    },
    salt: {
       type:   DataTypes.STRING,
        allowNull:false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Phonenumber is required"
            },
            notEmpty:{
                msg:"Provide a phone number"
            }
        }
    },
    lng: {
        type: DataTypes.NUMBER,
        allowNull:true,
    },
    lat: {
        type: DataTypes.NUMBER,
        allowNull:true,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        validate:{
            notNull:{
                msg:"Must be a verified user"
            },
            notEmpty:{
                msg:"Not a verified user"
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull:true,
    }
},

{
    sequelize:db,
    tableName:"users"
});

UserInstance.hasMany(ContactInstance, {foreignKey:"userId", as:"contacts"})
ContactInstance.belongsTo(UserInstance, {foreignKey:"userId", as:"user"})