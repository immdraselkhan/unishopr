export class Constants {
  public static ACCESS_TOKEN = "accessToken";
  public static REFRESH_TOKEN = "refreshToken";
  public static LOCAL_CART = "localCart";
  public static LOCAL_COUNTRY = "localCountry";
  public static AUTH_TYPE = { basic: "basic", bearer: "bearer" };
  public static USER_INFO = "userInfo";
  public static IS_TRAVELER = "isTraveler";

  static S3_BUCKET_NAME = "unishopr";
  static S3_DIR_NAME = "files";
  static S3_REGION = "ap-southeast-1";
  static S3_ACCESS_KEY_ID = "AKIA6NC5J4QAJ7MG2S4G";
  static S3_ACCESS_KEY_SECRET = "UTpBZKu+IBkbxXccVeliwI0f2c7Qm2V8RTpff5pc";

  static S3_FILE_NAME = (key: string) =>
    `${+new Date()}-${key.replace(/[ ,.]/g, "-")}`;
  static S3_LEADS = (key: string) =>
    `${this.S3_DIR_NAME}/leads/${key.replace(/[ ,.]/g, "-")}`;
  static S3_SCREENSHOT = (key: string) =>
    `${this.S3_DIR_NAME}/screenshot/${key.replace(/[ ,.]/g, "-")}`;
  static S3_PROFILES = (key: string) =>
    `${this.S3_DIR_NAME}/profiles/${key.replace(/[ ,.]/g, "-")}`;
  static S3_BASE_URL = (key: string) =>
    `https://unishopr.s3.ap-southeast-1.amazonaws.com/${key}`;

  public static CLIENT_ID = "demo-client";
  public static CLIENT_SECRET = "demo-secret";
  public static BASE_ENDPOINT = "https://api.unishopr.com/front-end/";
  // public static BASE_ENDPOINT = 'http://18.142.105.235:3333/front-end/';
  // public static BASE_ENDPOINT = 'http://localhost:3333/front-end/';
  public static SCRAPING_ENDPOINT = "https://scraper.unishopr.com/";
  // public static SCRAPING_ENDPOINT = 'http://localhost:4444/';

  public static AUTH_ENDPOINT = "auth";
  public static UTILITIES = "utilities";
  public static USER = "user";
  public static ACCOUNT = "account";
  public static PRODUCTS = "products";
  public static PAYMENTS = "payments";

  public static LANDING = "landing";
  public static ORDER = "order";
  public static TRAVEL = "travel";

  public static GENDERS = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
}
