import * as p5 from "p5";
import Boid from "./Boid";
import FlowField from "./FlowField";

const COLOURS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet"
];
const MINIMUM_BOIDS = 200;
const MAX_SPEED = 1.5;
const MAX_FORCE = 0.5;
const RADIUS = 3;
const RESOLUTION = 10;
const MOUSE_RANGE = RESOLUTION * 3;

function randomInt(s: p5, from: number, to: number) {
  return Math.floor(s.map(Math.random(), 0, 1, from, to));
}

export default (s: p5) => {
  let boids: Array<Boid> = [];
  let flowField: FlowField;

  s.setup = function() {
    s.createCanvas(400, 400);
    flowField = new FlowField({
      sketch: s,
      resolution: RESOLUTION
    });
  };

  s.mouseDragged = function() {
    flowField.attract(s.createVector(s.mouseX, s.mouseY), MOUSE_RANGE);
  };

  s.draw = function() {
    s.background(0);

    // let mouseTarget = createVector(mouseX, mouseY);
    // boids.forEach(boid => {
    //   let findMouse = boid.arrive(mouseTarget, 50);
    //   boid.applyForce(findMouse);
    // });

    boids.forEach(boid => {
      let force = boid.follow(flowField);
      boid.applyForce(force);
    });

    flowField.display();
    boids.forEach(boid => {
      boid.update();
      boid.display();
    });

    boids = boids.filter(b => b.onScreen());

    // Keep the population up
    while (boids.length < MINIMUM_BOIDS) {
      let location = s.createVector(
        randomInt(s, 0, s.width),
        randomInt(s, 0, s.height)
      );
      let colour = s.random(COLOURS);
      boids.push(
        new Boid({
          sketch: s,
          location,
          radius: RADIUS,
          maxSpeed: MAX_SPEED,
          maxForce: MAX_FORCE,
          colour
        })
      );
    }
  };
};