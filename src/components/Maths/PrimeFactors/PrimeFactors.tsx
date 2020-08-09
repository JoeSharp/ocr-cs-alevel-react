import React from "react";

import GraphSketch from "src/components/ComputerScience/GraphBuilder/GraphSketch";
import useSketch from "src/components/p5/useSketch";
import usePrimeFactorTree from "./usePrimeFactorTree";

// Delete
interface PrimeFactor {
  key: number;
  value: number;
}

class PrimeFactorSketch extends GraphSketch<PrimeFactor> {}

const PrimeFactors: React.FunctionComponent = () => {
  const [value, setValue] = React.useState<number>(1001);

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => setValue(parseInt(value)),
    [setValue]
  );

  const { refContainer, updateConfig } = useSketch(PrimeFactorSketch);

  React.useEffect(() => updateConfig({ getKey: (i: PrimeFactor) => i.key }), [
    updateConfig,
  ]);

  const { primeFactorTree, primeFactors } = usePrimeFactorTree(value);

  React.useEffect(() => updateConfig({ graph: primeFactorTree }), [
    primeFactorTree,
    updateConfig,
  ]);

  return (
    <div>
      <h1>Prime Factors</h1>
      <form>
        <div className="form-group">
          <label>Value</label>
          <input
            className="form-control"
            type="number"
            value={value}
            onChange={onValueChange}
          />
        </div>
      </form>

      <h2>Prime Factors</h2>
      <div>{primeFactors.join(" x ")}</div>

      <h2>Prime Factor Tree</h2>
      <div ref={refContainer} />
    </div>
  );
};
export default PrimeFactors;
