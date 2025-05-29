// Custom defined format function for numbering the blocks
String.prototype.format = function() {
    return [...arguments].reduce((p,c) => p.replace(/%s/,c), this);
};

function isObject(objValue) {
  return objValue && typeof objValue === 'object' && objValue.constructor === Object;
}