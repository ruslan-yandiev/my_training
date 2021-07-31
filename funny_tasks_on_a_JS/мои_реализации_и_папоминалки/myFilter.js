Array.prototype.myFilter = function (f, thisArr) {
    const arr = [];
  
    for (let i = 0; i < this.length; i++) {
      if (f(this[i], i, this)) arr.push(this[i]);
    }
  
    return arr;
  }
  
  console.log([1,2,3,4,5].myFilter((n) => n < 3));