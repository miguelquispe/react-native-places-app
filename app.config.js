import "dotenv/config";

export default ({ config }) => ({
  config: {
    ...config,
    android: {
      ...config.android,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
  },
  extra: {
    facebookAppId: process.env.FACEBOOK_APP_ID,
    tripAdvisorApiKey: process.env.TRIP_ADVISOR_API_KEY,
  },
});
