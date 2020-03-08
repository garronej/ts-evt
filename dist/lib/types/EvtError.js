"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var EvtError;
(function (EvtError) {
    var Timeout = /** @class */ (function (_super) {
        __extends(Timeout, _super);
        function Timeout(timeout) {
            var _newTarget = this.constructor;
            var _this_1 = _super.call(this, "Evt timeout after " + timeout + "ms") || this;
            _this_1.timeout = timeout;
            Object.setPrototypeOf(_this_1, _newTarget.prototype);
            return _this_1;
        }
        return Timeout;
    }(Error));
    EvtError.Timeout = Timeout;
    var Detached = /** @class */ (function (_super) {
        __extends(Detached, _super);
        function Detached() {
            var _newTarget = this.constructor;
            var _this_1 = _super.call(this, "Evt handler detached") || this;
            Object.setPrototypeOf(_this_1, _newTarget.prototype);
            return _this_1;
        }
        return Detached;
    }(Error));
    EvtError.Detached = Detached;
    var RacePromiseRejection = /** @class */ (function (_super) {
        __extends(RacePromiseRejection, _super);
        function RacePromiseRejection(onRejectedArgument, i, racer) {
            var _newTarget = this.constructor;
            var _this_1 = _super.call(this, "Evt race error: Promise at index " + i + " rejected") || this;
            _this_1.onRejectedArgument = onRejectedArgument;
            _this_1.i = i;
            _this_1.racer = racer;
            Object.setPrototypeOf(_this_1, _newTarget.prototype);
            return _this_1;
        }
        return RacePromiseRejection;
    }(Error));
    EvtError.RacePromiseRejection = RacePromiseRejection;
})(EvtError = exports.EvtError || (exports.EvtError = {}));
//# sourceMappingURL=EvtError.js.map