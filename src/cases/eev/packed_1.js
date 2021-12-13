import core from "eev-core";
import dispatcher from "eev-dispatcher";

const { World, Component, System } = core;
const { Dispatcher } = dispatcher;

class A extends Component {
  data = {
    value: 1,
  };
  constructor(attr) {
    super(attr);
    this.data = attr;
  }
}
class B extends Component {
  data = {
    value: 1,
  };
  constructor(attr) {
    super(attr);
    this.data = attr;
  }
}
class C extends Component {
  data = {
    value: 1,
  };
  constructor(attr) {
    super(attr);
    this.data = attr;
  }
}
class D extends Component {
  data = {
    value: 1,
  };
  constructor(attr) {
    super(attr);
    this.data = attr;
  }
}
class E extends Component {
  data = {
    value: 1,
  };
  constructor(attr) {
    super(attr);
    this.data = attr;
  }
}

class Add extends System {
  dependencies = [A];

  run(entities, world) {
    for (let [_, [ent]] of entities) {
      ent.value = ent.value * 2;
    }
  }
}

export default function test(count) {
  const world = new World();

  world.register(A);
  world.register(B);
  world.register(C);
  world.register(D);
  world.register(E);

  const addSystem = new Add();

  const dispatcher = new Dispatcher();
  dispatcher.register(addSystem);

  for (let i = 0; i < count; i++) {
    const entity = world.createEntity();
    world.applyComponent(new A({ value: 1 }), entity);
    world.applyComponent(new B({ value: 1 }), entity);
    world.applyComponent(new C({ value: 1 }), entity);
    world.applyComponent(new D({ value: 1 }), entity);
    world.applyComponent(new E({ value: 1 }), entity);
  }

  return () => {
    dispatcher.dispatch(world);
  };
}
