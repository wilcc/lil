const Node = function(value,){
  return{
    value,
    next:null,
}
}
const Lil = function(){
  return{
    head:null,
    addToStart: function(value){
      if(this.head === null){
        this.head = Node(value)
      }
      if(this.head !==null){
        const oldHead = this.head
        this.head = Node(value)
        this.head.next = oldHead
      }
    },
    addToEnd: function(value){
      if(this.head === null){
        this.head = Node(value)
      }
      else if(this.head !==null && this.head.next === null){
        this.head.next = Node(value)
      } else{
        let end = this.head.next
        while(end.next !== null){
          end = end.next
        }end.next = Node(value)
      }
    },
    removeFromStart : function(){
      const removed = this.head.value
      this.head = this.head.next
      return removed
    },
    removeFromEnd : function(){
      let end = this.head.next
      let current = this.head
        while(end.next !== null){
          current = end
          end = end.next
        }
        const toBe = end.value
        current.next =null
        end = null
        return toBe
    },
    getAt:function (index){
      if (!this.head){
        return null
      } else {
        let count = 0
        let current = this.head
        while(count !== index){
          current = current.next
          count++
        }return current.value
      }
    },
    removeAt: function(index){
      if (!this.head){
        return null
      }
      else {
        let count = index
        let removed = this.head
        count --
        while(count > 0){
          removed = removed.next
          count --
        }const toBe = removed.next.value
        let currentNext = removed.next
        // let beforeRemoved = removed
        // removed = currentNext
        removed.next = currentNext.next
        // beforeRemoved.next = removed.next
        // beforeRemoved = currentNext
        // currentNext = currentNext.next

        return toBe
      }
    }
  }
}


if (typeof Node === 'undefined') {
  Node = undefined;
}

if (typeof Lil === 'undefined') {
  Lil = undefined;
}


module.exports = {
  Lil,
  Node,
}
