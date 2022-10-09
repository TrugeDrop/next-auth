import mongoose from 'mongoose';

const connectMongo = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MONGO CONNECT!")
    })
    .catch(() => {
        console.log("MONGO NOT CONNECT!")
    });
};

export default connectMongo;