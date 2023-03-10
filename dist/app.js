"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = require("./config/index");
const users_1 = __importDefault(require("./routes/users"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_2 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//Sequelize Connection
index_1.db.sync()
    .then(() => {
    console.log('Database Connected Successfully');
})
    .catch((err) => {
    console.log(err);
});
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', index_2.default);
app.use('/users', users_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
exports.default = app;
