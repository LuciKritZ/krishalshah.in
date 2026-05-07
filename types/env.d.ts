declare namespace NodeJS {
  interface ProcessEnv {
    ADMIN_EMAIL: string;
    APP_URL: string;
    GITHUB_TOKEN: string;
    GITHUB_USERNAME: string;
    MONGO_URI: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_MIXPANEL_TOKEN: string;
    RESEND_API_KEY: string;
  }
}
