import s3 from 's3';

import config from '../config';

class S3Service {

  upload = (file, callback) => {

    const ext = file.originalname.split('.')[1];
    const filename  = ext ? (file.filename + '.' + ext) : file.filename;
    const S3_BUCKET = 'elasticbeanstalk-us-west-2-724469189813';

    let client = s3.createClient({
      s3Options: config.s3Options,
    });

    let params = {
      localFile: file.path,
      s3Params: {
        Key: `MasAlquileres/uploads/${filename}`,
        Bucket: S3_BUCKET,
        ACL: 'public-read'
      },
    };

    let uploader = client.uploadFile(params);

    uploader.on('error', (error) => {
      callback({ error: error });
    });

    uploader.on('end', (data) => {
      callback({ url:`https://${S3_BUCKET}.s3.amazonaws.com/MasAlquileres/uploads/${filename}`});
    });

  };

}

const S3ServiceInstance = new S3Service();

export default S3ServiceInstance;
