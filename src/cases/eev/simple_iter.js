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

class ABSystem extends System {
  dependencies = [A, B];

  run(entities, world) {
    let temp = 0;
    for (let [_, [a, b]] of entities) {
      temp = a.value;
      a.value = b.value;
      b.value = temp;
    }
  }
}

class CDSystem extends System {
  dependencies = [C, D];

  run(entities, world) {
    let temp = 0;
    for (let [_, [c, d]] of entities) {
      temp = d.value;
      d.value = c.value;
      c.value = temp;
    }
  }
}

class CESystem extends System {
  dependencies = [C, E];

  run(entities, world) {
    let temp = 0;
    for (let [_, [c, e]] of entities) {
      temp = e.value;
      e.value = c.value;
      c.value = temp;
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

  const dispatcher = new Dispatcher();
  dispatcher.register(new ABSystem());
  dispatcher.register(new CDSystem());
  dispatcher.register(new CESystem());

  for (let i = 0; i < count; i++) {
    let entity = world.createEntity();
    world.applyComponent(new A({ value: 0 }), entity);
    world.applyComponent(new B({ value: 1 }), entity);

    entity = world.createEntity();
    world.applyComponent(new A({ value: 0 }), entity);
    world.applyComponent(new B({ value: 1 }), entity);
    world.applyComponent(new C({ value: 2 }), entity);

    entity = world.createEntity();
    world.applyComponent(new A({ value: 0 }), entity);
    world.applyComponent(new B({ value: 1 }), entity);
    world.applyComponent(new C({ value: 2 }), entity);
    world.applyComponent(new D({ value: 3 }), entity);

    entity = world.createEntity();
    world.applyComponent(new A({ value: 0 }), entity);
    world.applyComponent(new B({ value: 1 }), entity);
    world.applyComponent(new C({ value: 2 }), entity);
    world.applyComponent(new E({ value: 4 }), entity);
  }

  return () => {
    dispatcher.dispatch(world);
  };
}
