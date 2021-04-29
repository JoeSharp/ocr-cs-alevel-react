import React from "react";
import { Chip, chipFactory, Clock } from "comp-sci-maths-lib";
import Nand from "comp-sci-maths-lib/dist/computation/nand/Logic/Nand";
import { Optional } from "comp-sci-maths-lib/dist/types";

interface UseChip {
  chip: Chip;
  clock: Clock;
  onTickTock: () => void;
  onTogglePin: (name: string, index: number) => void;
  pins: {
    [name: string]: Optional<boolean>;
  };
  buses: {
    [name: string]: Optional<boolean>[];
  };
}

const useChip = (chipName: string): UseChip => {
  const clock = React.useMemo(() => new Clock(), []);

  const [version, incrementVersion] = React.useReducer((i) => i + 1, 0);
  const chip = React.useMemo(() => {
    if (chipName in chipFactory) {
      return chipFactory[chipName](clock);
    }

    return new Nand();
  }, [clock, chipName]);

  const onTickTock = React.useCallback(() => {
    clock.ticktock();
    incrementVersion();
  }, [clock, incrementVersion]);

  const onTogglePin = React.useCallback(
    (name: string, index: number) => {
      if (name in chip.pins) {
        chip.getPin(name).send(!chip.getPin(name).lastOutput);
      } else if (name in chip.buses) {
        chip
          .getBus(name)
          .getPin(index)
          .send(!chip.getBus(name).getPin(index).lastOutput);
      }
      incrementVersion();
    },
    [chip, incrementVersion]
  );

  const pins = React.useMemo(() => {
    if (version < 0) {
      console.log("Weird");
    }
    const result: { [name: string]: Optional<boolean> } = {};
    Object.entries(chip.pins).forEach(
      ([name, { lastOutput }]) => (result[name] = lastOutput)
    );
    return result;
  }, [chip.pins, version]);

  const buses = React.useMemo(() => {
    if (version < 0) {
      console.log("Weird");
    }
    const result: { [name: string]: Optional<boolean>[] } = {};
    Object.entries(chip.buses).forEach(
      ([name, { inputBus }]) =>
        (result[name] = inputBus.map((i) => i.lastOutput))
    );

    return result;
  }, [chip.buses, version]);

  return {
    chip,
    clock,
    onTickTock,
    onTogglePin,
    pins,
    buses,
  };
};

export default useChip;
