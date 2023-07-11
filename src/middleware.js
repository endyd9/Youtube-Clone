import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "dy-wetube/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "dy-wetube/videos",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

const isProduction = process.env.NODE_ENV === "production";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "wetube";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isProduction = isProduction;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not autorized");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not autorized");
    return res.redirect("/");
  }
};

export const avatarUploadFiles = multer({
  dest: "upload/avatars/",
  limits: {
    fileSize: 300000,
  },
  storage: isProduction ? s3ImageUploader : undefined,
});
export const videoUploadFiles = multer({
  dest: "upload/videos/",
  limits: {
    fileSize: 50000000,
  },
  storage: isProduction ? s3VideoUploader : undefined,
});
