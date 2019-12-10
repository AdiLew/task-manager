const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'adilu.lev@gmail.com',
        subject: 'Thanks for joining in',
        text: `Hey ${name}!\nLet me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'adilu.lev@gmail.com',
        subject: 'Leaving so soon?',
        text: `Hey ${name},\nWe were sad to see you cancelled your account.\nIs there anything we could have done differently?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}