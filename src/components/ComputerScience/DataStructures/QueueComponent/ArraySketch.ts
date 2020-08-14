import { AbstractSketch } from "src/components/p5/useSketch";
import p5 from "p5";
import DataItemBoid from "src/components/p5/Boid/DataItemBoid";

const WIDTH = 600;
const HEIGHT = 600;

export interface BaseDataItem<T> {
  key: string;
  label: string;
  value: T;
}

export type NumberDataItem = BaseDataItem<number>;
export type StringDataItem = BaseDataItem<string>;

export enum Orientation {
  horizontal,
  vertical,
}

export interface Config<T> {
  orientation: Orientation;
  dataItems: BaseDataItem<T>[];
  lastRetrievedItem: BaseDataItem<T> | null;
}

const getDefaultConfig = <T>(): Config<T> => ({
  orientation: Orientation.horizontal,
  dataItems: [],
  lastRetrievedItem: null,
});

export class ArraySketch<T> extends AbstractSketch<Config<T>> {
  boids: DataItemBoid<BaseDataItem<T>>[];

  constructor() {
    super(getDefaultConfig());

    this.boids = [];
  }

  getOrCreateBoid = (s: p5, dataItem: BaseDataItem<T>): DataItemBoid<T> => {
    let boid = this.boids[dataItem.key];

    if (!boid) {
      boid = new DataItemBoid<BaseDataItem<T>>({
        entity: dataItem,
        position: s.createVector(0, 0),
        radius: 40,
        maxSpeed: 5,
        label: dataItem.label,
      });
      this.boids[dataItem.key] = boid;
    }

    return boid;
  };

  sketch = (s: p5) => {
    const that = this;

    s.setup = function () {
      s.createCanvas(WIDTH, HEIGHT);
      s.colorMode(s.HSB, 255);
      s.textFont("Helvetica", 18);
    };

    s.draw = function () {
      s.background(220);

      const { dataItems, lastRetrievedItem, orientation } = that.config;

      const boids = dataItems.map((d) => that.getOrCreateBoid(s, d));

      boids.forEach((boid, i) => {
        let target: p5.Vector;
        switch (orientation) {
          case Orientation.horizontal:
            target = s.createVector((i + 1) * 50, 100);
            break;
          case Orientation.vertical:
            target = s.createVector(100, (i + 1) * 50);
            break;
        }
        boid.arrive(s, target, 5);
      });

      if (lastRetrievedItem !== null) {
        const boid = that.getOrCreateBoid(s, lastRetrievedItem);

        let target: p5.Vector;
        switch (orientation) {
          case Orientation.horizontal:
            target = s.createVector(50, 200);
            break;
          case Orientation.vertical:
            target = s.createVector(200, 50);
            break;
        }
        boid.arrive(s, target, 5);
        boids.push(boid);
      }

      boids.forEach((b) => b.update(s));
      boids.forEach((b) => b.draw(s));
    };
  };
}

export class ArraySketchNumber extends ArraySketch<number> {}
export class ArraySketchString extends ArraySketch<string> {}

export default ArraySketch;
