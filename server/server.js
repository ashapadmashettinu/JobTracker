import app from './api/app.js';

const port = 8000;

app.listen(port, () => {

    console.log(`Job Portal app listening at http://localhost:${port}`)

});