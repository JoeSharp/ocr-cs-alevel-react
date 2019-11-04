import * as React from "react";

import Sketch, { Config, signalTypes } from "./Sketch";
import useSketch from "../P5Sketch/useSketch";

type ChangeEventHandlerFactory = (
  key: keyof Config
) => React.ChangeEventHandler<HTMLInputElement>;

const AnalogueSignals: React.FunctionComponent = () => {
  const {
    config: {
      samplingRate,
      quantisationStep,
      signalFrequency,
      signalType,
      plotSignal,
      plotSamples,
      plotQuantisation,
      plotSquareWave
    },
    updateConfig,
    refContainer
  } = useSketch(Sketch);

  const onNumericConfigChange: ChangeEventHandlerFactory = React.useCallback(
    (key: string): React.ChangeEventHandler<HTMLInputElement> => ({
      target: { value }
    }) => updateConfig({ [key]: parseFloat(value) }),
    [updateConfig]
  );

  const onBooleanConfigChange: ChangeEventHandlerFactory = React.useCallback(
    (key: string): React.ChangeEventHandler<HTMLInputElement> => ({
      target: { checked }
    }) => updateConfig({ [key]: checked }),
    [updateConfig]
  );

  const onSamplingRateChange = React.useMemo(
    () => onNumericConfigChange("samplingRate"),
    [onNumericConfigChange]
  );
  const onQuantisationStepChange = React.useMemo(
    () => onNumericConfigChange("quantisationStep"),
    [onNumericConfigChange]
  );
  const onSignalFrequencyChange = React.useMemo(
    () => onNumericConfigChange("signalFrequency"),
    [onNumericConfigChange]
  );

  const onPlotSignalChange = React.useMemo(
    () => onBooleanConfigChange("plotSignal"),
    [onBooleanConfigChange]
  );
  const onPlotSamplesChange = React.useMemo(
    () => onBooleanConfigChange("plotSamples"),
    [onBooleanConfigChange]
  );
  const onPlotQuantisationChange = React.useMemo(
    () => onBooleanConfigChange("plotQuantisation"),
    [onBooleanConfigChange]
  );
  const onPlotSquareWaveChange = React.useMemo(
    () => onBooleanConfigChange("plotSquareWave"),
    [onBooleanConfigChange]
  );
  const onSignalTypeChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = React.useCallback(
    ({ target: { value } }) => updateConfig({ signalType: value }),
    [updateConfig]
  );

  return (
    <div>
      <h1>Analogue Signals</h1>
      <form>
        <div className="form-group">
          <label htmlFor="signalType">Signal Type</label>
          <select
            className="custom-select"
            id="signalType"
            value={signalType}
            onChange={onSignalTypeChange}
          >
            {signalTypes.map(signalType => (
              <option key={signalType} value={signalType}>
                {signalType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="samplingRate">Sampling Rate (Hz)</label>
          <input
            type="number"
            className="form-control"
            id="samplingRate"
            placeholder="Sampling Rate"
            value={samplingRate}
            onChange={onSamplingRateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantisationStep">Quantisation Step (pixels)</label>
          <input
            type="number"
            className="form-control"
            id="quantisationStep"
            placeholder="Quantisation Step"
            value={quantisationStep}
            onChange={onQuantisationStepChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signalFrequency">Signal Frequency (Hz)</label>
          <input
            type="number"
            className="form-control"
            id="signalFrequency"
            placeholder="Signal Frequency"
            step="0.1"
            value={signalFrequency}
            onChange={onSignalFrequencyChange}
          />
        </div>
        <h4>Plot</h4>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSignal}
            onChange={onPlotSignalChange}
            id="chkPlotSignal"
          />
          <label className="form-check-label" htmlFor="chkPlotSignal">
            Signal
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSamples}
            onChange={onPlotSamplesChange}
            id="chkPlotSamples"
          />
          <label className="form-check-label" htmlFor="chkPlotSamples">
            Samples
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotQuantisation}
            onChange={onPlotQuantisationChange}
            id="chkPlotQuantisation"
          />
          <label className="form-check-label" htmlFor="chkPlotQuantisation">
            Quantisation
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            checked={plotSquareWave}
            onChange={onPlotSquareWaveChange}
            id="chkPlotSquareWave"
          />
          <label className="form-check-label" htmlFor="chkPlotSquareWave">
            Square Wave
          </label>
        </div>
      </form>
      <div ref={refContainer} />
    </div>
  );
};

export default AnalogueSignals;