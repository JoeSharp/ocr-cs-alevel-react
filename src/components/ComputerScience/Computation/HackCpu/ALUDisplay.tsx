import { HackCpu } from "comp-sci-maths-lib";
import { INumberBase } from "comp-sci-maths-lib/dist/dataRepresentation/numberBases/types";
import React from "react";

interface Props {
  cpu: HackCpu;
  numberBase: INumberBase;
}

const ALUDisplay: React.FunctionComponent<Props> = ({
  cpu: {
    addressRegister,
    dataRegister,
    alu: { aRegister, dRegister, mContents, lastComputation, lastResult },
  },
  numberBase,
}) => {
  return (
    <div>
      <h4>Internal Register</h4>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>D</label>
            <input
              readOnly
              className="form-control"
              value={numberBase.toString(dataRegister)}
            />
          </div>
        </div>
      </div>
      <h4>Last ALU Computation</h4>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>D</label>
            <input
              readOnly
              className="form-control"
              value={numberBase.toString(dRegister)}
            />
          </div>
          <div className="form-group">
            <label>A</label>
            <input
              readOnly
              className="form-control"
              value={numberBase.toString(aRegister)}
            />
          </div>
          <div className="form-group">
            <label>M</label>
            <input
              readOnly
              className="form-control"
              value={numberBase.toString(mContents)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Computation</label>
            <input readOnly className="form-control" value={lastComputation} />
          </div>
          <div className="form-group">
            <label>Result</label>
            <input
              readOnly
              className="form-control"
              value={numberBase.toString(lastResult)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALUDisplay;