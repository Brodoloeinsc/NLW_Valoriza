// Importing the required packages 
import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { router } from "./routes";
import "./database";

// Const Express to use the methods express
const app = express();

// Including express JSON 
app.use(express.json());

// Rendering the routes
app.use(router);

// Treating and writing the Errors
app.use(
  ( err: Error,req: express.Request,res: express.Response,next: express.NextFunction) => {
    if (err instanceof Error) {
      return res.status(400).json({
        message: err.message
      })
    }

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    })
  }
);

// Host and Port
app.listen(3000, () => {
  console.log("Servidor Rodando");
});
