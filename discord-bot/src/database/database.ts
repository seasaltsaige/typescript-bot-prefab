import { connect } from "mongoose";

connect(process.env.MONGO_URI, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) throw err;
    else console.log("Discord Bot > Successfully connected to the MongoDB server.");
});