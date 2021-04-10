import React from "react";

import { HackCpu, NumberBase } from "comp-sci-maths-lib";
import { Props as ButtonProps } from "src/components/Bootstrap/Buttons/Button";
import SetRamValueModal, { useSetRamValueModal } from "./SetRamValueModal";
import StartAddressDialog, {
  useDialog as useStartAddressDialog,
} from "./StartAddressDialog";
import { MAX_TABLE_ROWS } from "./types";
import ButtonBar from "src/components/Bootstrap/Buttons/ButtonBar";

interface Props {
  cpu: HackCpu;
  numberBase: NumberBase;
  setRamValue: (address: number, values: number[]) => void;
}

const RAMTable: React.FunctionComponent<Props> = ({
  cpu: { addressRegister, memory },
  numberBase,
  setRamValue,
}) => {
  const {
    componentProps: setRamValueProps,
    showDialog: showSetRamValueDialog,
  } = useSetRamValueModal({
    numberBase,
    onConfirm: React.useCallback(
      (address: number, values: number[]) => {
        setRamValue(address, values);
      },
      [setRamValue]
    ),
  });

  const {
    startAddress,
    showDialog: showStartAddressDialog,
    componentProps: startAddressProps,
  } = useStartAddressDialog({
    numberBase,
    maxAddress: memory.length,
  });

  const buttons: ButtonProps[] = React.useMemo(
    () => [
      {
        text: "Search",
        onClick: showStartAddressDialog,
        styleType: "primary",
      },
      {
        text: "Write",
        onClick: showSetRamValueDialog,
        styleType: "primary",
      },
    ],
    [showSetRamValueDialog, showStartAddressDialog]
  );

  return (
    <div>
      <h4>
        RAM
        <ButtonBar className="title-button" buttons={buttons} />
      </h4>

      <div className="form-group">
        <label>A</label>
        <input
          className="form-control"
          readOnly
          value={numberBase.toString(addressRegister)}
        />
      </div>
      <table className="cpu-table code-text">
        <thead>
          <tr>
            <th>Address</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {memory
            .filter(
              (p, i) => i >= startAddress && i < startAddress + MAX_TABLE_ROWS
            )
            .map((p, i) => (
              <tr
                key={i}
                className={
                  startAddress + i === addressRegister ? "highlighted" : ""
                }
              >
                <td>{numberBase.toString(startAddress + i)}</td>
                <td>{numberBase.toString(p)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <SetRamValueModal {...setRamValueProps} />
      <StartAddressDialog {...startAddressProps} />
    </div>
  );
};

export default RAMTable;
