"use strict";

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fun /* , thisParam */) {
        let len = this.length;
        if (typeof fun != "function")
            throw new TypeError();

        let thisParam = arguments[1];
        for (let i = 0; i < len; i++) {
            if (i in this)
                fun.call(thisParam, this[i], i, this);
        }
    };
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = (function (Object, max, min) {
        return function indexOf(member, fromIndex) {
            if (this === null || this === undefined)
                throw TypeError("Array.prototype.indexOf called on null or undefined");

            let that = Object(this), Len = that.length >>> 0, i = min(fromIndex | 0, Len);
            if (i < 0)
                i = max(0, Len + i);
            else if (i >= Len)
                return -1;

            if (member === void 0) {
                for (; i !== Len; ++i)
                    if (that[i] === void 0 && i in that)
                        return i; // undefined
            } else if (member !== member) {
                for (; i !== Len; ++i)
                    if (that[i] !== that[i])
                        return i; // NaN
            } else
                for (; i !== Len; ++i)
                    if (that[i] === member)
                        return i; // all else

            return -1; // if the value was not found, then return -1
        };
    })(Object, Math.max, Math.min);
}

// https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
          start = 0;
        }

        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, start) !== -1;
        }
    };
}

// https://stackoverflow.com/questions/881085/count-the-number-of-occurrences-of-a-character-in-a-string-in-javascript
if (!String.prototype.count) {
    String.prototype.count=function(c) { 
        var result = 0, i = 0;
        for(i;i<this.length;i++)if(this[i]==c)result++;
        return result;
    };
}

// https://www.consolelog.io/group-by-in-javascript/
if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (prop) {
        return this.reduce(function (groups, item) {
            const val = item[prop];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {})
    }
}