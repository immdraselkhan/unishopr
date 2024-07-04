export class Constants {
    static BASE_ENDPOINT = 'https://api.unishopr.co/';
    // static BASE_ENDPOINT = 'http://18.142.105.235:3333/';
    // static BASE_ENDPOINT = 'http://localhost:3333/';
    static CLIENT_ID = 'demo-client';
    static CLIENT_SECRET = 'demo-secret';
    static BASE_MEDIA_URL = 'https://api.unishopr.co/';
    // static BASE_MEDIA_URL = 'http://18.142.105.235:3333/';
    // static BASE_MEDIA_URL = 'http://localhost:3333/';
    static SCRAPING_ENDPOINT = 'https://scraper.unishopr.co/';

    static STORAGE_ACCESS_TOKEN = 'accessToken';
    static STORAGE_REFRESH_TOKEN = 'refreshToken';
    static STORAGE_USER_INFO = 'userInfo';
    static STORAGE_USER_SCOPES = 'userScopes';
    static STORAGE_USER_LOGGED_IN = 'userLoggedIn';

    static S3_BUCKET_NAME = 'unishopr';
    static S3_DIR_NAME = 'files';
    static S3_REGION = 'ap-southeast-1';
    static S3_ACCESS_KEY_ID = 'AKIA6NC5J4QAJ7MG2S4G';
    static S3_ACCESS_KEY_SECRET = 'UTpBZKu+IBkbxXccVeliwI0f2c7Qm2V8RTpff5pc';

    static S3_FILE_NAME = (key) => `${+ new Date()}-${key.replace(/[ ,.]/g, "-")}`;
    static S3_WEB_SETUP_DIR = (key) => `${this.S3_DIR_NAME}/web-setup/${key.replace(/[ ,.]/g, "-")}`;
    static S3_LEADS = (key) => `${this.S3_DIR_NAME}/leads/${key.replace(/[ ,.]/g, "-")}`;
    static S3_PRODUCT_DIR = (key) => `${this.S3_DIR_NAME}/product/${key.replace(/[ ,.]/g, "-")}`;
    static S3_BANNERS_DIR = (key) => `${this.S3_DIR_NAME}/banner/${key.replace(/[ ,.]/g, "-")}`;
    static S3_BASE_URL = (key) => `https://unishopr.s3.ap-southeast-1.amazonaws.com/${key}`;

    static AUTH = this.BASE_ENDPOINT + 'back-end/auth/';
    static UTILITIES = this.BASE_ENDPOINT + 'back-end/utilities/';
    static DASHBOARD = this.BASE_ENDPOINT + 'back-end/dashboard/';

    static USER_MANAGEMENT = this.BASE_ENDPOINT + 'back-end/user-management/';
    static WEB_SETUP = this.BASE_ENDPOINT + 'back-end/web-setup/';
    static CLIENTS = this.BASE_ENDPOINT + 'back-end/client/';
    static WORKSPACE = this.BASE_ENDPOINT + 'back-end/workspace/';

    static SCRAPING = this.SCRAPING_ENDPOINT;

    static discountTypes = [
        { name: 'Percentage', value: 'percentage' },
        { name: 'Flat', value: 'flat' },
    ];

    static WEEKDAYS = [
        { label: "Weekday", value: "" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" }
    ];

    static STATUS = [
        { label: "Status", value: "" },
        { label: "Available", value: "active" },
        { label: "Unavailable", value: "inactive" },
    ];

    static LEAD_STATUS = [
        { label: "Status", value: "" },
        { label: "Pending", value: "pending" },
        { label: "Ongoing", value: "ongoing" },
        { label: "Resolved", value: "resolved" },
        { label: "Checkout", value: "checkout" },
        { label: "Ordered", value: "ordered" },
        // { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Deleted", value: "deleted" },
    ];

    static TRAVEL_STATUS = [
        { label: "Status", value: "" },
        { label: "Upcoming", value: "upcoming" },
        { label: "Completed", value: "completed" },
    ];

    static ORDER_STATUS = [
        { label: "Status", value: "" },
        { label: "Placed", value: "placed" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Dispatched", value: "dispatched" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
    ];
}
