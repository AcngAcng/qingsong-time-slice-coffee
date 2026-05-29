import { prepareSignalBeans } from "../lib/prepare-signal-beans.js";
import { rawSignalsXaiSample } from "./raw-signals-xai-sample.js";

export const preparedSignals = prepareSignalBeans(rawSignalsXaiSample, {
  limit: 54,
});
