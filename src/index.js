import "babel-core/register";
import "babel-polyfill";
import { start } from "./start";
import dotenv from "dotenv";
dotenv.config();
start();
