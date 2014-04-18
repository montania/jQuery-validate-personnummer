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