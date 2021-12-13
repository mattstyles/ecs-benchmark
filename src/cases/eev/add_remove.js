import core from "eev-core";
import dispatcher from "eev-dispatcher";

const { World, Component, System } = core;
const { Dispatcher } = dispatcher;

class A extends Component {}
class B extends Component {}

class Add extends System {
  dependencies = [A];

  run(entities, world) {
    let entity = null;
    for (let [id] of entities) {
      world.applyComponent(new B(), id);
    }
  }
}

class Remove extends System {
  dependencies = [B];

  run(entities, world) {
    for (let [id] of entities) {
      world.removeComponent(new B(), id);
    }
  }
}

export default function test(count) {
  const world = new World();

  world.register(A);
  world.register(B);

  const dispatcher = new Dispatcher();
  dispatcher.register(new Add(), { priority: 1 });
  dispatcher.register(new Remove(), { priority: 2 });

  for (let i = 0; i < count; i++) {
    const entity = world.createEntity();
    world.applyComponent(new A(), entity);
  }

  return () => {
    dispatcher.dispatch(world);
  };
}
