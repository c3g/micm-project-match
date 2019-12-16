import aws from 'aws-sdk';

const s3 = new aws.S3();

const defaultParams = {
  Bucket: process.env.S3_BUCKET_NAME
};

export const upload = (location, mimeType, content) =>
  new Promise((res, rej) =>
    s3.upload({
      ...defaultParams,
      Key: location,
      Body: content,
      ContentType: mimeType
    }, (err, data) => {
      if (err) rej(err);
      else res(data);
    })
  );

export const deleteObject = location =>
  new Promise((res, rej) =>
    s3.deleteObject({ ...defaultParams, Key: location }, (err, data) => {
      if (err) rej(err);
      else res(data);
    })
  );

export const getFile = location =>
  s3.getObject({ ...defaultParams, Key: location });
