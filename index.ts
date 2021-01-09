import "dotenv/config";
import concurrently from "concurrently";

concurrently(
    [
        "cd discord-bot && ts-node src/index.ts",
        "cd backend && ts-node src/app.ts",
        "cd frontend && npm start"
    ],
);