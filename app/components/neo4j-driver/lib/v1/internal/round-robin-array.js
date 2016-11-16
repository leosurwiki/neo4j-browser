"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2002-2016 "Neo Technology,"
 * Network Engine for Objects in Lund AB [http://neotechnology.com]
 *
 * This file is part of Neo4j.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An array that lets you hop through the elements endlessly.
 */
var RoundRobinArray = function () {
  function RoundRobinArray(items) {
    _classCallCheck(this, RoundRobinArray);

    this._items = items || [];
    this._index = 0;
  }

  _createClass(RoundRobinArray, [{
    key: "next",
    value: function next() {
      var elem = this._items[this._index];
      if (this._items.length === 0) {
        this._index = 0;
      } else {
        this._index = (this._index + 1) % this._items.length;
      }
      return elem;
    }
  }, {
    key: "push",
    value: function push(elem) {
      this._items.push(elem);
    }
  }, {
    key: "pushAll",
    value: function pushAll(elems) {
      Array.prototype.push.apply(this._items, elems);
    }
  }, {
    key: "empty",
    value: function empty() {
      return this._items.length === 0;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._items = [];
      this._index = 0;
    }
  }, {
    key: "size",
    value: function size() {
      return this._items.length;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this._items;
    }
  }, {
    key: "remove",
    value: function remove(item) {
      var index = this._items.indexOf(item);
      while (index != -1) {
        this._items.splice(index, 1);
        if (index < this._index) {
          this._index -= 1;
        }
        //make sure we are in range
        if (this._items.length === 0) {
          this._index = 0;
        } else {
          this._index %= this._items.length;
        }
        index = this._items.indexOf(item, index);
      }
    }
  }]);

  return RoundRobinArray;
}();

exports.default = RoundRobinArray;