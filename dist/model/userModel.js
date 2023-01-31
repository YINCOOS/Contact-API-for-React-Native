"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../config/index");
const contactModel_1 = require("./contactModel");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Email is required"
            },
            isEmail: {
                msg: "Provide a valid email"
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required"
            },
            notEmpty: {
                msg: "Password is required"
            }
        }
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Phonenumber is required"
            },
            notEmpty: {
                msg: "Provide a phone number"
            }
        }
    },
    lng: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    lat: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Must be a verified user"
            },
            notEmpty: {
                msg: "Not a verified user"
            }
        }
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize: index_1.db,
    tableName: "users"
});
UserInstance.hasMany(contactModel_1.ContactInstance, { foreignKey: "userId", as: "contacts" });
contactModel_1.ContactInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "user" });
