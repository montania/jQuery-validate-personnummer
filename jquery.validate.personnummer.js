/*! jQuery validate personnummer - v1.1.0 - 2014-04-18
* https://github.com/montania/jQuery-validate-personnummer/
* Copyright (c) 2014 Montania System AB; Apache 2.0 License*/
/*! luhnar - v1.0.0 - 2014-04-18
* https://github.com/rickard2/luhnarjs
* Copyright (c) 2014 ; Licensed MIT */
(function (exports) {
    "use strict";

    exports.Luhnar = {
        _validators: {},
        addValidator: function (fn, country) {
            country = country.toLocaleLowerCase();

            this._validators[country] = fn;
        },
        validate: function (input, country) {
            country = country.toLocaleLowerCase();

            if (!this.supportsCountry(country)) {
                throw 'Unsupported country ' + country;
            }

            var validator = this._validators[country];

            return validator(input);
        },
        supportsCountry: function (country) {
            country = country.toLocaleLowerCase();

            return typeof this._validators[country] === 'function';
        }
    };
}(window));
(function (Luhnar) {

    "use strict";

    var Finland = function (input) {
        var checkDigit = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,h,j,k,l,m,n,p,r,s,t,u,v,w,x,y'.split(/,/);

        // Get the check digit
        var check = input.substr(-1, 1).toLowerCase();

        // Remove dash, plus or A
        if (input.length === 11) {
            input = input.substr(0, 6) + input.substr(7, 3);
        } else {
            input = input.substr(0, 9);
        }

        if (!input.match(/^\d+/)) {
            return false;
        }

        // Do the math
        var result = input % 31;

        return checkDigit[result] === check;
    };

    Luhnar.addValidator(Finland, 'fi');

}(Luhnar));
(function (Luhnar) {

    "use strict";

    var Sweden = function (input) {
        // Remove dash and plus
        input = input.replace('-', '').replace('+', '');

        // Remove century and check number
        if (input.length === 12) {
            input = input.substr(2, 10);
        } else if (input.length === 10) {
            input = input.substr(0, 10);
        } else {
            return false;
        }

        var year = parseInt(input.substr(0, 2), 10);
        var month = parseInt(input.substr(2, 2), 10) - 1;
        var day = parseInt(input.substr(4, 2), 10);

        var date = new Date(year, month, day);

        if (date.getYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
            return false;
        }

        // Remove check number
        var check = parseInt(input.substr(9, 1), 10);
        input = input.substr(0, 9);

        var result = 0;

        // Calculate check number
        for (var i = 0, len = input.length; i < len; i++) {

            var number = parseInt(input.substr(i, 1), 10);

            // Multiply every other number with two
            if ((i % 2) === 0) {
                number = (number * 2);
            }

            // If result is greater than 10, 'sum the digits'
            // which is the same as 1 + (number mod 10)
            if (number > 9) {
                result += (1 + (number % 10));
            } else {
                result += number;
            }
        }

        return (((check + result) % 10) === 0);
    };

    Luhnar.addValidator(Sweden, 'se');

}(Luhnar));
(function ($, Luhnar) {

    "use strict";

    $.validator.addMethod("personnummer", function (value) {

        // Empty values should be restricted by required constraint
        if (!value) {
            return true;
        }

        return Luhnar.validate(value, 'se');
    });
}(jQuery, Luhnar));