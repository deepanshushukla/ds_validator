
var ds_validator = (function () {
    var el;


    function ds_validator(form, callback) {
        //init All
        ds_validator.prototype.errorobject = [];
        ds_validator.prototype.responseobject = {};
        ds_validator.prototype.finalarry = {};
        //responsecode 0 for true 1 for false
        ds_validator.prototype.responsecode = 0;
        var totalElement =form.elements.length;
        for (var i = 0; i < totalElement; i++) {
            el = form.elements[i];
            var validateAttr = form.elements[i].getAttribute('validate');
            if (validateAttr != null) {
                var validateAttrArr = validateAttr.split(' ');


                ds_validator.prototype.parsevalidatorArray(validateAttrArr, el, function (response) {
                    if (i == form.elements.length - 1) {
                        ds_validator.prototype.finalarry.status = ds_validator.prototype.responsecode;
                        ds_validator.prototype.finalarry.response = ds_validator.prototype.errorobject;
                        callback(ds_validator.prototype.finalarry);
                    }
                });
            }

        }

    };


    ds_validator.prototype.parsevalidatorArray = function (validateAttrArr, el, _callback) {

        for (var i = 0; i < validateAttrArr.length;) {

            //required field should not be empty

            if (validateAttrArr[i].indexOf('req') > -1) {
                ds_validator.prototype.required(el, validateAttrArr[i], function (response) {

                    if (response == false) {
                        ds_validator.prototype.responsecode = 1;
                        ds_validator.prototype.errorobject.push({
                            element: el,
                            name: el.name,
                            'req': ds_validator.prototype.errorMSG.req
                        })


                    }

                });
            }
            //for min length
            else if (validateAttrArr[i].indexOf('min') > -1) {
                ds_validator.prototype.minimumLength(el, validateAttrArr[i], function (response) {

                    if (response == false) {
                        ds_validator.prototype.responsecode = 1;
                        ds_validator.prototype.errorobject.push({
                            element: el,
                            name: el.name,
                            'min': ds_validator.prototype.errorMSG.min
                        })


                    }

                });
            }
            //for max length
            else if (validateAttrArr[i].indexOf('max') > -1) {
                ds_validator.prototype.maximumLength(el, validateAttrArr[i], function (response) {

                    if (response == false) {

                        ds_validator.prototype.responsecode = 1;
                        ds_validator.prototype.errorobject.push({
                            element: el,
                            name: el.name,
                            'max': ds_validator.prototype.errorMSG.max
                        })


                    }

                });

            }
            //for number only
            else if (validateAttrArr[i].indexOf('num') > -1) {
                ds_validator.prototype.numeric(el, validateAttrArr[i], function (response) {

                    if (response == false) {

                        ds_validator.prototype.responsecode = 1;
                        ds_validator.prototype.errorobject.push({
                            element: el,
                            name: el.name,
                            'num': ds_validator.prototype.errorMSG.num
                        })


                    }

                });

            }
            //should be alphanumeric string
            else if (validateAttrArr[i].indexOf('alp') > -1) {
                ds_validator.prototype.alphaNumber(el, validateAttrArr[i], function (response) {
                    if (response == false) {


                        ds_validator.prototype.responsecode = 1;
                        ds_validator.prototype.errorobject.push({
                            element: el,
                            name: el.name,
                            'alp': ds_validator.prototype.errorMSG.alp
                        })


                    }

                });

            }
            //valid email
            else if (validateAttrArr[i].indexOf('vem') > -1) {
                ds_validator.prototype.validEmail(el, validateAttrArr[i], function (response) {

                    if (response == false) {


                        ds_validator.prototype.responsecode = 1;
                        ds_validator.prototype.errorobject.push({
                            element: el,
                            name: el.name,
                            'vem': ds_validator.prototype.errorMSG.vem
                        })


                    }

                });

            }
            //no special character
            else if (validateAttrArr[i].indexOf('nsl') > -1) {
                ds_validator.prototype.noSpecialCharacter(el, validateAttrArr[i], function (response) {

                        if (response == false) {

                            ds_validator.prototype.responsecode = 1;
                            ds_validator.prototype.errorobject.push({
                                element: el,
                                name: el.name,
                                'nsl': ds_validator.prototype.errorMSG.nsl
                            })


                        }

                    }
                );

            }
            if (i == validateAttrArr.length - 1) {
                i++;
                ds_validator.prototype.responseobject = {
                    code: ds_validator.prototype.responsecode,
                    errorobject: ds_validator.prototype.errorobject
                };

                _callback(ds_validator.prototype.responseobject)
            }
            else {
                i++;
            }


        }

    };

    ds_validator.prototype.required = function (el, value, _callback) {
        if ((el.value).trim().length > 0) {
            _callback(true);
        }
        else {
            _callback(false);

        }
    };
    ds_validator.prototype.minimumLength = function (el, value, _callback) {
        var arr = value.split(':');
        var reqlength = parseInt(arr[1]);
        if (el.value.length < reqlength) {
            _callback(false);
        }
        else {
            _callback(true);
        }
    };
    ds_validator.prototype.maximumLength = function (el, value, _callback) {
        var arr = value.split(':');
        var reqlength = parseInt(arr[1]);
        if (el.value.length > reqlength) {
            _callback(false);
        }
        else {
            _callback(true);
        }
    };
    ds_validator.prototype.numeric = function (el, value, _callback) {
        if (isNaN(el.value)) {
            _callback(false);
        }
        else {
            _callback(true);
        }
    };
    ds_validator.prototype.alphaNumber = function (el, value, _callback) {
        if (el.value.toLowerCase().match("^[a-zA-Z0-9]*$")) {
            if (el.value.toLowerCase().match(/\d+/g) != null) {
                _callback(true);
            }
            else {
                _callback(false);
            }

        }
        else {
            _callback(false);
        }
    };
    ds_validator.prototype.noSpecialCharacter = function (el, value, _callback) {
        var regex = /^[a-z\d ]+$/i;
        if (!regex.test(el.value.toLowerCase())) {
            _callback(false);
        }
        else {
            _callback(true);
        }
    };
    ds_validator.prototype.validEmail = function (el, value, _callback) {
        var email_regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        if (!email_regex.test(el.value.trim())) {
            _callback(false);
        }
        else {
            _callback(true);
        }
    };

    ds_validator.prototype.errorMSG = {
        req: "This is a mandatory field",
        min: "This field doesn't meet minimum length criteria",
        max: "This field doesn't meet maximum, length criteria",
        num: "Please Enter Numeric data", //should contain only numbers
        vem: 'Please Enter a valid Email',
        alp: 'Please Enter Alphanumeric String',
        nsl: 'There should not be any special character'
    };


    return ds_validator;

})();



