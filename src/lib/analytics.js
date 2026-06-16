import { track } from "@vercel/analytics";

export const trackEvent = (name, properties) => {
  track(name, properties);
};
