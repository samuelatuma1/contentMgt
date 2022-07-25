"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("dotenv/config");
var processEnv = process.env;
async function run() {
    try {
        await (0, mongoose_1.connect)(processEnv.mongoDBURI);
        console.log("connected to Database");
    }
    catch (err) {
        console.log("Erro occured connecting to DataBase");
        console.log("########################################");
        console.log(err);
        console.log("########################################");
    }
}
exports.default = run;
