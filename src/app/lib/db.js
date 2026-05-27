import mongoose from "mongoose";

const connectionStr = "mongodb://kalerohit291_db_user:Rohitkale2929@ac-tfk0xad-shard-00-00.pcsos07.mongodb.net:27017,ac-tfk0xad-shard-00-01.pcsos07.mongodb.net:27017,ac-tfk0xad-shard-00-02.pcsos07.mongodb.net:27017/?ssl=true&replicaSet=atlas-ctfcds-shard-0&authSource=admin&appName=Cluster0";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(connectionStr);
};

export { connectionStr };
export default connect;

