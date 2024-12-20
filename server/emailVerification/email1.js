// without google apis

// for more documentation
// https://www.geeksforgeeks.org/how-to-send-email-with-nodemailer-using-gmail-account-in-node-js/
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'danishbansal60@gmail.com',
        // this is the app password and it is required
        // use oauth2 for better implementation
        // personal passwords are not valid here
        pass: 'pcngmxstxpbqnzdm'
    },
    tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate errors
    },
});

let mailDetails = {
    from: 'danishbansal60@gmail.com',
    to: 'danishbansal2001@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
}

mailTransporter
    .sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
                console.log(err)
            } else {
                console.log('Email sent successfully');
            }
        });