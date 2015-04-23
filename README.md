jQuery Form Optimizer
=======================

Introduction
-----------------
This plugin enables to validate input element easily and add input helper.

Usage
-----------------
1. HTML parameter pattern

````
<form name="input-form" method="post" action="/" formnovalidate="formnovalidate" data-role="validation">
    <input type="text" name="email" title="email" data-validation='{"unit":{"required": true, "format":"email"}, "relation": [{"type": "same", "key": "email", "role": "body"}]}' data-input-helper='{"cancelspace":true}'>
    <input type="text" name="email2" title="email2" data-validation='{"unit":{"required": true, "format":"email"}, "relation": [{"type": "same", "key": "email", "role": "confirmation"}]}' data-input-helper='{"cancelspace":true}'>
</form>
````

2. javascript option pattern

````
<form name="input-form" method="post" action="/" formnovalidate="formnovalidate" data-role="validation">
    <input type="text" name="email" title="email">
    <input type="text" name="email2" title="email2">
</form>
````

````
// execute form validator
var $form = $('[data-role=validation]');
$form.validator({}, [
    {
        "name": "email",
        "unit": {
            "required": true,
            "format": "email"
        },
        "relation": [
            {
                "type": "same",
                "key": "email",
                "role": "body"
            }
        ]
    },
    {
        "name": "email2",
        "unit": {
            "required": true,
            "format": "email"
        },
        "relation": [
            {
                "type": "same",
                "key": "email",
                "role": "confirmation"
            }
        ]
    }
);

// execute input helper
$('[data-input-helper]').inputHelper({}, [
    "email": {
        "cancelspace": true
    },
    "email-confirmation": {
        "cancelspace": true
    }
]);
````

Links
-----------------
* [Demo](http://form-optimizer.thujikun.com/demo/)
* [Document](http://form-optimizer.thujikun.com/docs/)
* [Spec](http://form-optimizer.thujikun.com/spec/)

Requirements
-----------------
jQuery-.1.7.2+

Compatibility
-----------------
* Internet Explorer
* Firefox
* Chrome
* Safari
* Mobile Safari
* Android browser
* Android Chrome

※ I help only latest 2 version of IE/Firefox/Chrome/Safari/Android Browser
