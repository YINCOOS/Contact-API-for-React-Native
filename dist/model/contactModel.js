"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInstance = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../config/index");
class ContactInstance extends sequelize_1.Model {
}
exports.ContactInstance = ContactInstance;
ContactInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    favorite: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: index_1.db,
    tableName: 'contacts'
});
