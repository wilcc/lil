const {
  Lil,
  Node,
} = require('./main.js')

describe('Node', () => {
  it(`returns an object`, () => {
    const node = Node()
    expect(typeof node).toBe('object')
  })
})

describe('Node.value', () => {
  it(`has the value passed to its constructor`, () => {
    const node1 = Node(3)
    const node2 = Node('hi')
    expect(node1.value).toBe(3);
    expect(node2.value).toBe('hi');
  })
})

describe('Node.next', () => {
  it(`begins as a null value`, () => {
    const node = Node();
    expect(node.next).toBe(null)
  })
})

describe('Lil', () => {
  it(`returns an object`, () => {
    const lil = Lil();
    expect(typeof lil).toBe('object')
  })
})

describe('Lil.head', () => {
  it(`begins as a null value`, () => {
    const lil = Lil();
    expect(lil.head).toBe(null);
  })
})

describe('Lil.addToStart', () => {
  it(`if there's no head, adds a new Node as that head`, () => {
    const lil = Lil();
    lil.addToStart()
    expect(lil.head).not.toBeNull()
  });

  it(`if there's no head, adds a new Node as that head with the given value`, () => {
    const lil = Lil();
    lil.addToStart('some value')
    expect(lil.head.value).toBe('some value')
  })

  it(`if there is a head, adds a new Node with the given value as the new head and makes the new Node's next property the old head`, () => {
    const lil = Lil();
    lil.addToStart('a first value');
    lil.addToStart('a second value');
    lil.addToStart('a third value');
    expect(lil.head.value).toBe('a third value')
    expect(lil.head.next.value).toBe('a second value')
    expect(lil.head.next.next.value).toBe('a first value')
  })
});


describe('Lil.addToEnd', () => {
  it(`if there's no head, adds a new Node as that head`, () => {
    const lil = Lil();
    lil.addToEnd();
    expect(lil.head).not.toBeNull()
  })

  it(`if there's no head, gives the Node added the given value`, () => {
    const lil = Lil();
    lil.addToEnd(3);
    expect(lil.head.value).toBe(3)
  })
  
  it(`if there is a head and it's the only node, adds the new node as the head's next`, () => {
    const lil = Lil();
    lil.addToEnd(3);
    expect(lil.head.value).toBe(3)
    lil.addToEnd(150);
    expect(lil.head.next.value).toBe(150);
  })
  
  it(`if there is a head and other nodes, adds the new node as the last item's next`, () => {
    const lil = Lil();
    lil.addToEnd(3);
    expect(lil.head.value).toBe(3)
    lil.addToEnd(150);
    expect(lil.head.next.value).toBe(150);
    lil.addToEnd(14);
    expect(lil.head.next.next.value).toBe(14);
  })
})

describe('Lil.removeFromStart', () => {
  it(`removes the old head`, () => {
    const lil = Lil();
    lil.addToStart('hello')
    lil.addToStart('hi')
    lil.addToStart('how are you')
    lil.removeFromStart();
    expect(lil.head.value).not.toEqual({value: 'how are you'})
  })

  it(`sets the head as the previously-second node`, () => {
    const lil = Lil();
    lil.addToEnd('yo')
    lil.addToEnd(`what's up`)
    lil.addToEnd('you are cool')
    lil.addToEnd('we should be friends')
    lil.removeFromStart();
    expect(lil.head.value).toBe(`what's up`)
  })

  it(`maintains the order after that`, () => {
    const lil = Lil();
    lil.addToEnd(500)
    lil.addToEnd(50)
    lil.addToEnd(501);
    lil.addToEnd(12)
    lil.removeFromStart();
    expect(lil.head.next.value).toBe(501)
    expect(lil.head.next.next.value).toBe(12)
  })

  it(`returns the removed value`, () => {
    const lil = Lil();
    lil.addToEnd(3);
    lil.addToEnd(15);
    lil.addToEnd(6);
    const removed = lil.removeFromStart();
    expect(removed).toBe(3);
  })
});

describe('Lil.removeFromEnd', () => {
  it(`removes the last item from the list`, () => {
    const lil = Lil();
    lil.addToEnd(500);
    lil.addToEnd(50);
    lil.addToEnd(501);
    lil.addToEnd(12);
    lil.removeFromEnd();
    expect(lil.head.next.next.next).toBe(null)
    lil.removeFromEnd();
    expect(lil.head.next.next).toBe(null)
    lil.removeFromEnd();
    expect(lil.head.next).toBe(null)
  })

  it(`returns the removed value`, () => {
    const lil = Lil();
    lil.addToEnd(3);
    lil.addToEnd(15);
    lil.addToEnd(6);
    const removed = lil.removeFromEnd();
    expect(removed).toBe(6);
  })
});

describe('Lil.getAt', () => {
  it(`if there's no head, returns null`, () => {
    const lil = Lil();
    expect(lil.getAt(0)).toBe(null)
  })

  it(`given a 0-based index, will return the value at that node`, () => {
    const lil = Lil();
    lil.addToEnd(5)
    lil.addToEnd(500)
    lil.addToEnd(301)

    expect(lil.getAt(0)).toBe(5)
    expect(lil.getAt(1)).toBe(500)
    expect(lil.getAt(2)).toBe(301)
  })
});

describe('Lil.removeAt', () => {
  it(`if there's no head, returns null`, () => {
    const lil = Lil();
    expect(lil.removeAt(0)).toBe(null)
  })

  it(`given a 0-based index, will remove the node at that index`, () => {
    const lil = Lil();
    lil.addToEnd(5)
    lil.addToEnd(500)
    lil.addToEnd(301)
    lil.addToEnd(500);
    lil.addToEnd(50);
    lil.addToEnd(501);
    lil.addToEnd(12);
    lil.addToEnd('yo')
    lil.addToEnd(`what's up`)
    lil.addToEnd('you are cool')
    lil.addToEnd('we should be friends')
    // Our list is now:
    // 5, 500, 301, 500, 50, 501, 12, yo, what's up, you are cool, we should be friends

    lil.removeAt(1);
    lil.removeAt(3);
    lil.removeAt(5);
    lil.removeAt(6);
    // Now it should be:
    // -> 5, 301, 500, 501, 12, what's up, we should be friends

    const valueAt1 = lil.head.next.value;
    const valueAt6 = lil.head.next.next.next.next.next.next.value;
    expect(valueAt1).toBe(301)
    expect(valueAt6).toBe(`we should be friends`)
  })

  it(`returns the removed value`, () => {
    const lil = Lil();
    lil.addToEnd(3);
    lil.addToEnd(15);
    lil.addToEnd(6);
    const removed = lil.removeAt(1);
    expect(removed).toBe(15);
  })
});
