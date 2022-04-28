import mongoose from 'mongoose';
export function DBConnection(mongoURI) {
  this.mongoURI = mongoURI;

  this.dbConnect = async function (options = { keepAlive: true }) {
    await mongoose
      .connect(this.mongoURI, options)
      .then(() => console.log('mongodb connection succeed'));
  };
}
