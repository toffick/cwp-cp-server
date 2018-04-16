const jwt = require('jsonwebtoken');

(async () => {
    const token = jwt.sign(
        {id: 1},
        'key',
        {expiresIn: '1s'});

    setTimeout(async ()=>{
        try {
            var decoded = jwt.decode(token, {complete: true}.payload);
            console.log(decoded);
            // const paylaod = await jwt.verify('uyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIzODkwNzM1LCJleHAiOjE1MjM5OTA3MzV9.iu0XunMszfV6hGwD7KYfoqrXWRhRVSByFWZxM2r8BeA', 'key');
            // const paylaod = await jwt.verify(token, 'key');
            // console.log(paylaod);
        }catch (e){
            console.log(e);
        }
    }, 2000);

})()
