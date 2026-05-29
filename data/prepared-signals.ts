import { prepareSignalBeans, type PreparedSignalBean } from "../lib/prepare-signal-beans.js";
import { rawSignalsXaiSample } from "./raw-signals-xai-sample.js";

export type PreparedSignal = PreparedSignalBean;

export const preparedSignals: PreparedSignal[] = prepareSignalBeans(rawSignalsXaiSample, {
  limit: 54,
});
