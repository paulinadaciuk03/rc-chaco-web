const app = require('./app/app');
require('dotenv').config();
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server andando en puerto ${port}`)
});

