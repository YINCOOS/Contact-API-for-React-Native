import {DataTypes, Model} from 'sequelize';
import {db} from '../config/index';

export interface ContactAttributes {
    id: string;
    country:string;
    firstName:string;
    lastName:string;
    phone:string;
    email:string;
    favorite:boolean;
    userId:string;
    image:string;

}

export class ContactInstance extends Model<ContactAttributes>{}

ContactInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    country: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    firstName: { 
        type: DataTypes.STRING,
        allowNull:true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
    userId: {
        type: DataTypes.UUIDV4,
        allowNull:true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull:true,
    },
}, {
    sequelize: db,
    tableName: 'contacts'
});