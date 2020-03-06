function rotateVector(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

function colisionResolve(b1, b2) {
  const vxDiff = b1.velocity.x - b2.velocity.x;
  const vyDiff = b1.velocity.y - b2.velocity.y;

  const xDist = b2.position.x - b1.position.x;
  const yDist = b2.position.y - b1.position.y;

  if (vxDiff * xDist + vyDiff * yDist >= 0) {
    const angle = -Math.atan2(b2.position.y - b1.position.y, b2.position.x - b1.position.x);

    const m1 = b2.mass || 1
    const m2 = b1.mass || 1

    const u1 = rotateVector(b1.velocity, angle);
    const u2 = rotateVector(b2.velocity, angle);

    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    const vFinal1 = rotateVector(v1, -angle);
    const vFinal2 = rotateVector(v2, -angle);

    b1.velocity.x = vFinal1.x;
    b1.velocity.y = vFinal1.y;

    b2.velocity.x = vFinal2.x;
    b2.velocity.y = vFinal2.y;
  }
}