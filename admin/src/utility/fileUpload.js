import AWS from "aws-sdk";
import {Constants} from "../config/constants";
import {Alert} from "../services/alertService";

export const uploadFile = (file, directory = null) => new Promise((resolve, reject) => {
    const fileName = Constants.S3_FILE_NAME(file.name);
    AWS.config.update({
        accessKeyId: Constants.S3_ACCESS_KEY_ID,
        secretAccessKey: Constants.S3_ACCESS_KEY_SECRET,
        region: Constants.S3_REGION
    });

    const myBucket = new AWS.S3();
    const params = {
        ACL: 'public-read',
        Bucket: Constants.S3_BUCKET_NAME,
        Key: `${directory}/${fileName}`,
        ContentType: file.type,
        Body: file,
    };

    myBucket.upload(params, async (err, res) => {
        if (err) {
            Alert.error({title: "Something went wrong"})
        } else resolve(res)
    });
});

export const uploadVideo = async (file, directory = null, setUploading, callback) => {
    const fileName = Constants.S3_FILE_NAME(file.name);

    AWS.config.update({
        accessKeyId: Constants.S3_ACCESS_KEY_ID,
        secretAccessKey: Constants.S3_ACCESS_KEY_SECRET,
        region: Constants.S3_REGION
    });

    const myBucket = new AWS.S3();

    const params = {
        ACL: 'public-read',
        Bucket: Constants.S3_BUCKET_NAME,
        Key: `${directory}/${fileName}`,
        ContentType: file.type,
        Body: file,
    };

    let reader = new FileReader();
    reader.onloadend = () => {
        let media = new Audio(reader.result);
        media.onloadedmetadata = async () => {
            setUploading(0);
            await myBucket.upload(params, async (err, res) => {
                if (err) {
                    Alert.error({title: "Something went wrong"})
                } else callback({...res, duration: parseInt(media.duration)})
            }).on('httpUploadProgress', (evt) => setUploading(Math.round((evt.loaded / evt.total) * 100)));
        }
    };
    reader.readAsDataURL(file);
}


export const deleteFile = ((key, callback) => {
    AWS.config.update({
        accessKeyId: Constants.S3_ACCESS_KEY_ID,
        secretAccessKey: Constants.S3_ACCESS_KEY_SECRET,
        region: Constants.S3_REGION
    });

    const myBucket = new AWS.S3();

    let params = {
        Bucket: Constants.S3_BUCKET_NAME,
        Key: key
    };

    myBucket.deleteObject(params, function(err, data) {
        if (err) {
            console.log(err)
        } else callback(data)
    });
})
