declare namespace NodeJS {
  interface ProcessEnv {
    RESEND_API_KEY: string;
    NEXT_PUBLIC_APP_URL: string;
    APP_URL: string;
    MONGO_URI: string;
    ADMIN_EMAIL: string;
  }
}
