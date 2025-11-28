import express from "express";
import connectDB from "@/config/database";
import { initSwagger } from "@/config/swagger";
import Router from "@/routes/index";
import { adminSeeder } from "@/seed/adminSeeder";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Router);
initSwagger(app);

connectDB().then(async () => {
  await adminSeeder();
  app.listen(4000, () => {
    console.log(`server run on port ${process.env.PORT || 4000}`);
    console.log(
      `API Documentation available at http://localhost:${
        process.env.PORT || 4000
      }/api-docs`
    );
  });
});
