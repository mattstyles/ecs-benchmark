import core from "eev-core";
import dispatcher from "eev-dispatcher";

const { World, Component, System } = core;
const { Dispatcher } = dispatcher;

const components = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXY", () => {
  return class extends Component {
    data = {
      value: 1,
    };
    constructor(attr) {
      super(attr);
      this.data = attr;
    }
  };
});

class Z extends Component {
  data = {
    value: 1,
  };
  constructor(attr) {
    super(attr);
    this.data = attr;
  }
}

class Data extends Component {
  data = {
    value: 1,
  };
  constructor(attr) {
    super(attr);
    this.data = attr;
  }
}

class DataSystem extends System {
  dependencies = [Data];

  run(entities, world) {
    let temp = 0;
    for (let [_, [data]] of entities) {
      data.value = data.value * 2;
    }
  }
}

class ZSystem extends System {
  dependencies = [Z];

  run(entities, world) {
    let temp = 0;
    for (let [_, [z]] of entities) {
      z.value = z.value * 2;
    }
  }
}

export default function test(count) {
  const world = new World();

  world.register(Data);
  world.register(Z);

  for (let component of components) {
    world.register(components);
  }

  const dispatcher = new Dispatcher();
  dispatcher.register(new DataSystem());
  dispatcher.register(new ZSystem());

  let entity = null;
  for (let i = 0; i < count; i++) {
    for (let component of components) {
      entity = world.createEntity();
      world.applyComponent(new Data({ value: 0 }), entity);
      world.applyComponent(new component({ value: 0 }), entity);
    }
  }

  return () => {
    dispatcher.dispatch(world);
  };
}
