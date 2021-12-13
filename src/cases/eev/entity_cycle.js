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
    let entity2 = null;
    for (let ent of entities) {
      entity = world.createEntity();
      world.applyComponent(new B(), entity);

      entity2 = world.createEntity();
      world.applyComponent(new B(), entity2);
    }
  }
}

class Remove extends System {
  dependencies = [B];

  run(entities, world) {
    for (let [id] of entities) {
      world.removeEntity(id);
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
