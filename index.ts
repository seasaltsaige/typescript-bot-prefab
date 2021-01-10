import "dotenv/config";
import concurrently from "concurrently";

concurrently(
    [
        "cd discord-bot && nodemon --exec ts-node src/index.ts",
        "cd backend && nodemon --exec ts-node src/app.ts",
        "cd frontend && npm start"
    ],
);