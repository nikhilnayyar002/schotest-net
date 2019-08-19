export interface processEnvironment {
  isProduction: boolean;
  port: number;
  mongoURI: string;
  jwtSecret: string;
  jwtExp: string;
}

export interface globalEnvironment {
  /** all rest api requests will have base "/api"
   *  except "imageRequestUrl" given below.
   *  Eg: http://localhost:3000/api/method
   */
  restAPI: string;
  server: {
    dev: processEnvironment;
    prod: processEnvironment;
    /**
     *  Given that server/src/controllers exists
     *  then @imageUploads will be relative to folder "server"
     *  Eg: value is "/uploads" then directory is "server/uploads"
     */
    imageUploads: string;
    /** Bytes */
    imageUploadSize: number;
  };
  /** Send image response from server
   *  value must be relative like: "/public/images"
   *  Eg: http://localhost:3000/images/cat_1566038728579.jpeg"
   */
  imageRequestUrl: string;
  /** name of parameter in formData for wrapped image */
  imageFormDataName: string;
  /** no of test to display per page. Eg: 10 per page */
  noOfTestsPerPage: number;
  /** use to encrypt password on client side and decrypt it on server side*/
  passwordSecret:string;
}
