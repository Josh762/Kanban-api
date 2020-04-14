//
// import express from 'express';
// import './api/controllers/boardsAPI'
//
// async function startServer() {
//     const app = express();
//
//     /**
//      * A little hack here
//      * Import/Export can only be used in 'top-level code'
//      * Well, at least in node 10 without babel and at the time of writing
//      * So we are using good old require.
//      **/
//     await require('./loaders').default({ expressApp: app });
//     const port = 3000; // TODO needs to be in a config
//     app.listen(port, err => {
//         if (err) {
//             // process.exit(1);
//             console.error("Server Failed to Start", err);
//             return;
//         }
//         console.info(`
//       ################################################
//       🛡️  Server listening on port: ${port} 🛡️
//       ################################################
//     `);
//     });
// }
//
// startServer();

import server from './config/server';
import './config/database';

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});