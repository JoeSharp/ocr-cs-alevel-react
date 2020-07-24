import * as p5 from "p5";

import Boid from "../rainbowFlowField/Boid";

/**
 * Generate a random integer within a p5 sketch.
 *
 * @param s The p5 sketch, provides library function .map()
 * @param from The lower bound of the number (inclusive)
 * @param to The upper bound of the number to generate (exclusive)
 */
function randomInt(s: p5, from: number, to: number) {
  return Math.floor(s.map(Math.random(), 0, 1, from, to));
}

// Each boid will be one of these colours
const COLOURS: string[] = ["red", "blue", "green"];

// Clip the speed of all boids to this
const MAX_SPEED = 1.5;

// Clip the force applied per frame
const MAX_FORCE = 0.5;

// Size of boid
const RADIUS = 3;

export default (s: p5) => {
  let boids: Array<Boid> = [];
  let centreScreen: p5.Vector;

  // Create the initial list of boids
  s.setup = function () {
    s.createCanvas(400, 400);
    centreScreen = s.createVector(200, 200);

    for (let i = 0; i < 5; i++) {
      // Place the boids randomly anywhere within the view
      let location = s.createVector(
        randomInt(s, 0, s.width),
        randomInt(s, 0, s.height)
      );

      // Each boid will be a random colour
      let colour = s.random(COLOURS);

      boids.push(
        new Boid({
          sketch: s,
          location,
          radius: RADIUS,
          maxSpeed: MAX_SPEED,
          maxForce: MAX_FORCE,
          colour,
        })
      );
    }
  };

  s.draw = function () {
    // Draw the background
    s.background(0);

    // Loop through the boids
    boids.forEach((b) => {
      // Call seek and get the force
      let seekForce = b.seek(centreScreen);
      // Pass the force to apply force
      b.applyForce(seekForce);
    });

    // Loop through each boid, calling update
    boids.forEach((b) => b.update());

    // Loop through each boid, calling display
    boids.forEach((b) => b.display());

    // Filter boids by calling onScreen
    boids = boids.filter((b) => b.onScreen());
  };
};