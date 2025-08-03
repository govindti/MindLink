// import app from "../app";
// import connectDB from "./db";

// const startServer = async () => {
//   try {
//     await connectDB();
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`Server started successfully on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Error starting the server:", error);
//     process.exit(1);
//   }
// };

// export default startServer;


import cluster from 'cluster';
import os from 'os';
import app from '../app';
import connectDB from './db';

const isProduction = process.env.NODE_ENV === 'production';
const numCPUs = isProduction ? os.cpus().length : 1;
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Worker ${process.pid} started on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Worker ${process.pid} failed to start:`, error);
    process.exit(1);
  }
}

function setupCluster() {
  if (cluster.isPrimary) {
    console.log(`🎯 Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`⚠️ Worker ${worker.process.pid} died`);
      if (isProduction) {
        console.log('♻️ Forking a new worker...');
        cluster.fork();
      }
    });
  } else {
    startServer();
  }
}

// Export either the cluster setup or direct server start based on environment
export default isProduction ? setupCluster : startServer;