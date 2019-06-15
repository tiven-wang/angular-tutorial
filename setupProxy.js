const express = require('express');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(proxy('/sap/opu', { target: 'http://<your-server>:<port>/', changeOrigin: true, auth: "<user>:<password>" }));

app.listen(3000, function() {
    console.info("Proxy Server on 3000");
});