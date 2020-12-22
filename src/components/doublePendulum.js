import React, { useEffect } from 'react';
import * as p5 from 'p5';

const DoublePendulum = () => {
  const Sketch = (p5) => {
    // length of the ropes
    let l1 = 100;
    let l2 = 100;
    // mass of the balls
    let m1 = 10;
    let m2 = 10;
    // angles
    let a1, a2;
    // angles first derivative
    let a1_ddt = 0;
    let a2_ddt = 0;
    //  variabels to keep 2nd balls previous state for drawing
    let px2, py2;
    // gravity!
    let g = (10 * 9.81) / (60 * 60); //at 60fps

    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.background(14, 39, 60);
      // starting from 90  degrees
      a1 = p5.PI / 2;
      a2 = p5.PI / 2;
      // buffer created for drawing
      p5.buffer = p5.createGraphics(p5.windowWidth, p5.windowHeight);
      p5.buffer.background(14, 39, 60);
      p5.buffer.translate(p5.windowWidth / 2, (p5.windowHeight * 1) / 3);
    };

    p5.draw = () => {
      // add the buffer to the background
      p5.background(14, 39, 60);
      p5.image(p5.buffer, 0, 0, p5.windowWidth, p5.windowHeight);
      // set the color and thickness of the lines
      p5.stroke(204, 204, 204);
      p5.strokeWeight(2);
      // shift (0,0)
      p5.translate(p5.windowWidth / 2, (p5.windowHeight * 1) / 3);

      // https://www.myphysicslab.com/pendulum/double-pendulum-en.html
      // calculate secound derivatives of angles
      let num1 =
        -g * (2 * m1 + m2) * p5.sin(a1) -
        m2 * g * p5.sin(a1 - 2 * a2) -
        2 *
          p5.sin(a1 - a2) *
          m2 *
          (a2_ddt ** 2 * l2 + a1_ddt ** 2 * l1 * p5.cos(a1 - a2));
      let den1 = l1 * (2 * m1 + m2 - m2 * p5.cos(2 * a1 - 2 * a2));
      let a1_d2dt2 = num1 / den1;

      let num2 =
        2 *
        p5.sin(a1 - a2) *
        (a1_ddt ** 2 * l1 * (m1 + m2) +
          g * (m1 + m2) * p5.cos(a1) +
          a2_ddt ** 2 * l2 * m2 * p5.cos(a1 - a2));
      let den2 = l2 * (2 * m1 + m2 - m2 * p5.cos(2 * a1 - 2 * a2));
      let a2_d2dt2 = num2 / den2;

      // calculate coordinates of the balls
      let x1 = l1 * p5.sin(a1);
      let x2 = x1 + l2 * p5.sin(a2);
      let y1 = l1 * p5.cos(a1);
      let y2 = y1 + l2 * p5.cos(a2);

      // draw ropes and balls
      p5.line(0, 0, x1, y1);
      p5.fill(204, 204, 204);
      p5.line(x1, y1, x2, y2);
      p5.fill(204, 204, 204);
      p5.ellipse(x1, y1, m1, m1);
      p5.ellipse(x2, y2, m2, m2);

      // calculate the angles
      a1_ddt += a1_d2dt2;
      a2_ddt += a2_d2dt2;
      a1 += a1_ddt;
      a2 += a2_ddt;

      // draw the movement trace of the secound ball
      p5.buffer.stroke(232, 93, 117);
      if (p5.frameCount > 1) {
        p5.buffer.line(px2, py2, x2, y2);
      }
      //update start locations for the trace drawing
      px2 = x2;
      py2 = y2;
    };
  };

  useEffect(() => {
    new p5(Sketch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default DoublePendulum;
