import { connect } from "mongoose";

connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log("Backend > Successfully connected to the MongoDB server.");
});