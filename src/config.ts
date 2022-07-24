import {connect} from "mongoose"
import "dotenv/config";

var processEnv: any = process.env

export default async function run(){
    try{
        await connect(processEnv.mongoDBURI)
        console.log("connected to Database")
    } catch(err){
        console.log("Erro occured connecting to DataBase")
        console.log("########################################")
        console.log(err)
        console.log("########################################")

    }
}