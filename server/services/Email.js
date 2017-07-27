import ses from 'node-ses';

import config from '../config';

class EmailService {

  send = (req, callback) => {
    const accessKeyId = config.s3Options.accessKeyId;
    const secretAccessKey = config.s3Options.secretAccessKey;

    let client = ses.createClient({key: accessKeyId, secret: secretAccessKey, amazon: 'https://email.us-west-2.amazonaws.com'});

    // Give SES the details and let it construct the message for you.
    client.sendEmail(req, callback);
  };

}

const controller = new EmailService();

export default controller;
