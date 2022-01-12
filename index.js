let engine = Matter.Engine.create();

let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1600,
      height: 800, 
      wireframes: false
  }
});

let ledge = Matter.Bodies.rectangle(1200, 700, 300, 20, { isStatic: true }); 

let ledge2 = Matter.Bodies.rectangle(1200, 400, 300, 20, { isStatic: true }); 


let ball = Matter.Bodies.circle(300, 600,20);
let sling = Matter.Constraint.create({ 
      pointA: { x: 300, y: 600 }, 
      bodyB: ball, 
      stiffness: 0.05
  });

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
          render: {visible: false}
      }
  });
render.mouse = mouse;

let firing = false;
Matter.Events.on(mouseConstraint,'enddrag', function(e) {
  if(e.body === ball) firing = true;
});
Matter.Events.on(engine,'afterUpdate', function() {
  if (firing && Math.abs(ball.position.x-300) < 20 && Math.abs(ball.position.y-600) < 20) {
      ball = Matter.Bodies.circle(300, 600, 20);
      Matter.World.add(engine.world, ball);
      sling.bodyB = ball;
      firing = false;
  }
});

function endLevel() {
    let stack;
    let stack2;
    Matter.World.remove(engine.world, [ball, sling, mouseConstraint]);
    Matter.World.clear(engine.world);
    Matter.Render.stop(render);
    Matter.Engine.clear(engine);
  }

function level1() {
  let stack = Matter.Composites.stack(1100, 400, 4, 4, 0, 0, function(x, y) { 
    return Matter.Bodies.polygon(x, y, 8, 30);
  });
  Matter.World.add(engine.world, [stack, ledge, ball, sling, mouseConstraint]);
  Matter.Engine.run(engine);
  Matter.Render.run(render);
}

function level2() {
  let stack2 = Matter.Composites.stack(1100, 150, 4, 4, 0, 0, function(x, y) { 
    return Matter.Bodies.polygon(x, y, 8, 30);
  });
  Matter.World.add(engine.world, [stack2, ledge2, ball, sling, mouseConstraint]);
  Matter.Engine.run(engine);
  Matter.Render.run(render);
}

function level3(){
  let stack = Matter.Composites.stack(1100, 400, 4, 4, 0, 0, function(x, y) { 
    return Matter.Bodies.polygon(x, y, 8, 30);
  });
  let stack2 = Matter.Composites.stack(1100, 150, 4, 4, 0, 0, function(x, y) { 
    return Matter.Bodies.polygon(x, y, 8, 30);
  });
  Matter.World.add(engine.world, [stack, stack2, ledge, ledge2, ball, sling, mouseConstraint]);
  Matter.Engine.run(engine);
  Matter.Render.run(render);
}


document.getElementById("level1").addEventListener("click", () => {
  endLevel();
  setInterval(level1(), 3000);
});

document.getElementById("level2").addEventListener("click", () => {
  endLevel();
  setInterval(level2(), 3000);
});

document.getElementById("level3").addEventListener("click", () => {
  endLevel();
  setInterval(level3(), 3000);
});