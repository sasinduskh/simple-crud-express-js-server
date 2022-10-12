const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;


const region = 'ap-south-1'
const accessKeyId = 'AKIAV7MQ67G624L4SNZZ'
const secretAccessKey = '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'

exports.s3Uploadv2 = async (file) => {
    const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey
    })

    const param = {
        Bucket: 'merncrudsample',
        Key: `upload/${uuid()}-${file.originalname}`,
        Body: file.buffer
    };

    return await s3.upload(param).promise();
}