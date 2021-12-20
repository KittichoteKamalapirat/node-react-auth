import "babel-polyfill";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { User } from "./types";

const credentials = require("./allowed-credentials.json");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

try {
  Promise.all([])
    .then(() => {
      app.get("/hz", (req, res) => {
        return res.json({
          status: 200,
          message: "API is up",
        });
      });

      app.get("/", (req, res) => {
        res.json({ message: "API is running" });
      });
      /**
       * TODO: API Routes implementation goes here.
       *
       */

      /** */
      app.post("/auth/signin", (req, res) => {
        const input = req.body;

        // find the use by name input, then check whether the password provided matches
        const user: User = credentials.find(
          (credential: User) => credential.email === input.email
        );

        if (!user) {
          return res.status(403).json({
            message: "Unauthorized",
          });
        }
        if (user.password === input.password) {
          res.status(200).json({ name: user.name, email: user.email });
        } else {
          return res.status(403).json({
            message: "Unauthorized",
          });
        }
      });

      app.listen(PORT, () => {
        console.log(`API is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      throw error;
    });
} catch (error) {
  console.error(error);
}
