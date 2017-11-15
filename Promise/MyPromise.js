function MyPromise(callback) {
  this.status = 'pending';
  this.reason = null;
  this.data = null;
  this.resolveCallbacks = [];
  this.rejectCallbacks = [];

  var self = this;

  function resolve() {
    self.resolveCallbacks.forEach(cb => {
      cb(self.data);
    });
  }

  function reject() {
    self.rejectCallbacks.forEach(cb => {
      cb(self.reason);
    });
  }

  function resolver(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled';
      self.data = value;
      resolve();
    }
  }

  function rejector(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.reason = reason;
      reject();
    }
  }
  callback(resolver, rejector);
};

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  if (this.status === 'fulfilled' && onFulfilled) {
    return new MyPromise(r => {
      r(onFulfilled(this.data));
    });
  } else if (this.status === 'rejected' && onRejected) {
    return new MyPromise((_, r) => {
      r(onRejected(this.reason));
    });
  } else if (this.status === 'pending') {
    var self = this;
    return new MyPromise((resolve, reject) => {
      if (onFulfilled) {
        function wrapperFulfill(data) {
          resolve(onFulfilled(data));
        }
        self.resolveCallbacks.push(wrapperFulfill);
      }
      if (onRejected) {
        function wrapperReject(reason) {
          reject(onRejected(reason));
        }
        self.rejectCallbacks.push(wrapperReject);        
      }
    });
  }
};

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

module.exports = MyPromise;
