(function($) {
    $(function() {

        $('input, textarea, select').on('validate', function(e, result) {
            var prefix = result.checkType;

            if (result.error) {
                $(this).addClass(prefix + '-invalid');
            } else {
                $(this).removeClass(prefix + '-invalid');
            }
        });

        $('#top').on('tabinit', function() {
            var $form = $('#sample-form1');

            // initialize validator
            $form.validator();
            // initialize input helper
            $form.find('[data-input-helper]').inputHelper();
        });

        $('#validator-unit').on('tabinit', function() {

            // required
            $('#sample-form-required1').validator();
            $('#sample-form-required2').validator({}, [
                {
                    name: 'required',
                    unit: {
                        'required': true
                    }
                }
            ]);

            // required-check
            var $form1 = $('#sample-form-required-check1');
            $form1.validator().on('submit', function(e) {
                e.preventDefault();
                $form1.validator('formValidate').done(function(result) {
                    if (result.error) {
                        alert(result.data[0].errorMessage);
                    }
                });
            });
            var $form2 = $('#sample-form-required-check2');
            $form2.validator({}, [
                {
                    name: 'required-check',
                    unit: {
                        'required-check': 3
                    }
                }
            ]).on('submit', function(e) {
                e.preventDefault();
                $form2.validator('formValidate').done(function(result) {
                    if (result.error) {
                        alert(result.data[0].errorMessage);
                    }
                });
            });

            // maxlength
            $('#sample-form-maxlength1').validator();
            $('#sample-form-maxlength2').validator({}, [
                {
                    name: 'maxlength',
                    unit: {
                        'maxlength': 5
                    }
                }
            ]);

            // minlength
            $('#sample-form-minlength1').validator();
            $('#sample-form-minlength2').validator({}, [
                {
                    name: 'minlength',
                    unit: {
                        'minlength': 2
                    }
                }
            ]);

            // maxnum
            $('#sample-form-maxnum1').validator();
            $('#sample-form-maxnum2').validator({}, [
                {
                    name: 'maxnum',
                    unit: {
                        'maxnum': 9999
                    }
                }
            ]);

            // minnum
            $('#sample-form-minnum1').validator();
            $('#sample-form-minnum2').validator({}, [
                {
                    name: 'minnum',
                    unit: {
                        'minnum': 100
                    }
                }
            ]);

            // format number
            $('#sample-form-number1').validator();
            $('#sample-form-number2').validator({}, [
                {
                    name: 'number',
                    unit: {
                        format: 'number'
                    }
                }
            ]);

            // format half-char
            $('#sample-form-half-char1').validator();
            $('#sample-form-half-char2').validator({}, [
                {
                    name: 'half-char',
                    unit: {
                        format: 'half-char'
                    }
                }
            ]);

            // format half
            $('#sample-form-half1').validator();
            $('#sample-form-half2').validator({}, [
                {
                    name: 'half',
                    unit: {
                        format: 'half'
                    }
                }
            ]);

            // format half-kana
            $('#sample-form-half-kana1').validator();
            $('#sample-form-half-kana2').validator({}, [
                {
                    name: 'half-kana',
                    unit: {
                        format: 'half-kana'
                    }
                }
            ]);

            // format url
            $('#sample-form-url1').validator();
            $('#sample-form-url2').validator({}, [
                {
                    name: 'url',
                    unit: {
                        format: 'url'
                    }
                }
            ]);

            // format tel
            $('#sample-form-tel1').validator();
            $('#sample-form-tel2').validator({}, [
                {
                    name: 'tel',
                    unit: {
                        format: 'tel'
                    }
                }
            ]);

            // format tel
            $('#sample-form-tel-i18n1').validator();
            $('#sample-form-tel-i18n2').validator({}, [
                {
                    name: 'tel-i18n',
                    unit: {
                        format: 'tel-i18n'
                    }
                }
            ]);

            // format email
            $('#sample-form-email1').validator();
            $('#sample-form-email2').validator({}, [
                {
                    name: 'email',
                    unit: {
                        format: 'email'
                    }
                }
            ]);

            // format full-kana
            $('#sample-form-full-kana1').validator();
            $('#sample-form-full-kana2').validator({}, [
                {
                    name: 'full-kana',
                    unit: {
                        format: 'full-kana'
                    }
                }
            ]);

            // format date
            $('#sample-form-date1').validator();
            $('#sample-form-date2').validator({}, [
                {
                    name: 'date',
                    unit: {
                        format: 'date'
                    }
                }
            ]);

            // format dateYM
            $('#sample-form-dateYM1').validator();
            $('#sample-form-dateYM2').validator({}, [
                {
                    name: 'dateYM',
                    unit: {
                        format: 'dateYM'
                    }
                }
            ]);

            // format credit
            $('#sample-form-credit1').validator();
            $('#sample-form-credit2').validator({}, [
                {
                    name: 'credit',
                    unit: {
                        format: 'credit'
                    }
                }
            ]);

            // regexp
            $('#sample-form-regexp1').validator();
            $('#sample-form-regexp2').validator({}, [
                {
                    name: 'regexp',
                    unit: {
                        'regexp': '^a'
                    }
                }
            ]);
        });

        $('#validator-relation').on('tabinit', function() {

            // same relation
            $('#sample-form-relation-same1').validator();
            $('#sample-form-relation-same2').validator({}, [
                {
                    name: 'email-body',
                    relation: [
                        {
                            type: 'same',
                            key: 'email-key',
                            role: 'body'
                        }
                    ]
                },
                {
                    name: 'email-confirmation',
                    relation: [
                        {
                            type: 'same',
                            key: 'email-key',
                            role: 'confirmation'
                        }
                    ]
                }
            ]);

            // date-around
            $('#sample-form-relation-date-around1').validator();
            $('#sample-form-relation-date-around2').validator({}, [
                {
                    name: 'date-around-before',
                    relation: [
                        {
                            type: 'date-around',
                            key: 'date-around-key',
                            role: 'before'
                        }
                    ]
                },
                {
                    name: 'date-around-after',
                    relation: [
                        {
                            type: 'date-around',
                            key: 'date-around-key',
                            role: 'after'
                        }
                    ]
                }
            ]);

            // credit relation
            $('#sample-form-relation-credit1').validator();
            $('#sample-form-relation-credit2').validator({}, [
                {
                    name: 'credit-relation1',
                    relation: [
                        {
                            type: 'credit',
                            key: 'credit-key'
                        }
                    ]
                },
                {
                    name: 'credit-relation2',
                    relation: [
                        {
                            type: 'credit',
                            key: 'credit-key'
                        }
                    ]
                },
                {
                    name: 'credit-relation3',
                    relation: [
                        {
                            type: 'credit',
                            key: 'credit-key'
                        }
                    ]
                },
                {
                    name: 'credit-relation4',
                    relation: [
                        {
                            type: 'credit',
                            key: 'credit-key'
                        }
                    ]
                }
            ]);
        });

        $('#input-helper').on('tabinit', function() {
            var $form;

            // cancel space
            $('#sample-form-cancelspace1').find('input, textarea').inputHelper();
            $('#sample-form-cancelspace2').find('input, textarea').inputHelper({}, {
                cancelspace: true
            });

            // auto next
            $('#sample-form-autonext1').find('input, textarea').inputHelper();
            $form = $('#sample-form-autonext2');
            $form.find('input[name=autonext1]').inputHelper({}, {
                autonext: 2
            });
            $form.find('input[name=autonext2]').inputHelper({}, {
                autonext: 3
            });
            $form.find('input[name=autonext3]').inputHelper({}, {
                autonext: 4
            });

            // auto prev
            $('#sample-form-autoprev1').find('input, textarea').inputHelper();
            $form = $('#sample-form-autoprev2');
            $form.find('input[name=autoprev2]').inputHelper({}, {
                autoprev: true
            });
            $form.find('input[name=autoprev3]').inputHelper({}, {
                autoprev: true
            });
            $form.find('input[name=autoprev4]').inputHelper({}, {
                autoprev: true
            });

            // full2half
            $('#sample-form-full2half1').find('input, textarea').inputHelper();
            $('#sample-form-full2half2').find('input[name=full2half]').inputHelper({}, {
                full2half: true
            });

            // fullKana2halfKana
            $('#sample-form-fullKana2halfKana1').find('input, textarea').inputHelper();
            $('#sample-form-fullKana2halfKana2').find('input[name=fullKana2halfKana]').inputHelper({}, {
                fullKana2halfKana: true
            });

            // half2full
            $('#sample-form-half2full1').find('input, textarea').inputHelper();
            $('#sample-form-half2full2').find('input[name=half2full]').inputHelper({}, {
                half2full: true
            });

            // halfKana2FullKana
            $('#sample-form-halfKana2fullKana1').find('input, textarea').inputHelper();
            $('#sample-form-halfKana2fullKana2').find('input[name=halfKana2fullKana]').inputHelper({}, {
                halfKana2fullKana: true
            });

            // restrict number
            $('#sample-form-restrict-number1').find('input, textarea').inputHelper();
            $('#sample-form-restrict-number2').find('input[name=restrict-number]').inputHelper({}, {
                restriction: 'number'
            });

            // restrict half-char
            $('#sample-form-restrict-half-char1').find('input, textarea').inputHelper();
            $('#sample-form-restrict-half-char2').find('input[name=restrict-half-char]').inputHelper({}, {
                restriction: 'half-char'
            });

            // restrict half
            $('#sample-form-restrict-half1').find('input, textarea').inputHelper();
            $('#sample-form-restrict-half2').find('input[name=restrict-half]').inputHelper({}, {
                restriction: 'half'
            });

            // restrict tel
            $('#sample-form-restrict-tel1').find('input, textarea').inputHelper();
            $('#sample-form-restrict-tel2').find('input[name=restrict-tel]').inputHelper({}, {
                restriction: 'tel'
            });

            // restrict full-kana
            $('#sample-form-restrict-full-kana1').find('input, textarea').inputHelper();
            $('#sample-form-restrict-full-kana2').find('input[name=restrict-full-kana]').inputHelper({}, {
                restriction: 'full-kana'
            });

            // restrict zip
            $('#sample-form-restrict-zip1').find('input, textarea').inputHelper();
            $('#sample-form-restrict-zip2').find('input[name=restrict-zip]').inputHelper({}, {
                restriction: 'zip'
            });

            // restrict date
            $('#sample-form-restrict-date1').find('input, textarea').inputHelper();
            $('#sample-form-restrict-date2').find('input[name=restrict-date]').inputHelper({}, {
                restriction: 'date'
            });

            // restrict credit
            $('#sample-form-restrict-credit1').find('input, textarea').inputHelper();
            $('#sample-form-restrict-credit2').find('input[name=restrict-credit]').inputHelper({}, {
                restriction: 'credit'
            });

            // insert zip
            $('#sample-form-insert-zip1').find('input, textarea').inputHelper();
            $('#sample-form-insert-zip2').find('input[name=insert-zip]').inputHelper({}, {
                insert: 'zip'
            });

            // insert credit
            $('#sample-form-insert-credit1').find('input, textarea').inputHelper();
            $('#sample-form-insert-credit2').find('input[name=insert-credit]').inputHelper({}, {
                insert: 'credit'
            });

            // credit card company
            $('#sample-form-creditcard1').find('input, textarea').inputHelper().on('ditectcredit', function(e, result) {
                var $inputRow = $(this).closest('.input-row');

                $inputRow.find('.credit-icon').removeClass('active');
                switch(result.creditCardType) {
                    case 'visa':
                        $inputRow.find('.visa').addClass('active');
                        break;
                    case 'master':
                        $inputRow.find('.master').addClass('active');
                        break;
                    case 'jcb':
                        $inputRow.find('.jcb').addClass('active');
                        break;
                }
            });
            $('#sample-form-creditcard2').find('input[name=credit]').inputHelper({}, {
                credit: true
            }).on('ditectcredit', function(e, result) {
                var $inputRow = $(this).closest('.input-row');

                $inputRow.find('.credit-icon').removeClass('active');
                switch(result.creditCardType) {
                    case 'visa':
                        $inputRow.find('.visa').addClass('active');
                        break;
                    case 'master':
                        $inputRow.find('.master').addClass('active');
                        break;
                    case 'jcb':
                        $inputRow.find('.jcb').addClass('active');
                        break;
                }
            });

            // remove
            $('#sample-form-helper-remove1').find('input, textarea').inputHelper();
            $('#sample-form-helper-remove2').find('input[name=email-body]').inputHelper({}, {
                remove: '.remove-target'
            });
        });

        $('.pure-menu-heading').click();
    });
}(jQuery));
