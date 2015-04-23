(function($) {
    $(function() {
        'use strict';

        var $form = $('[data-role=validation]');

        $form.validator({
            checks: {
                'required-check': {
                    eventtype: ['change'],
                    listener: '_chkRequiredCheck'
                }
            }
        }).on('submit.validator', function(e) {
            e.preventDefault();
            $form.validator('formValidate').then(function(result) {
                var $errorMessages = $form.find('.error-messages'),
                    errorMessages = [];

                $errorMessages.removeClass('active').empty();

                if (result.error) {
                    result.data.forEach(function(result) {
                        if (result.errorMessage) {
                            errorMessages.push('<li data-target="'+ result.target.prop('name') +'">' + result.errorMessage + '</li>');
                        }
                    });
                    $errorMessages.append(errorMessages.join('')).addClass('active').find('li').on('click', function() {
                        var $target = $form.find('[name=' + $(this).data('target') + ']');

                        requestAnimationFrame(function() {
                            $('html, body').animate({
                                scrollTop: $target.offset().top
                            });
                        });
                    });
                } else {
                    $form.off('.validator').submit();
                }
            });
        }).find('input, select, textarea').not('[name^=email]').on('validate', function(e, result) {
            var $el = $(this),
                prefix = result.checkType,
                type = $el.attr('type');

            if (result.error) {
                $el.addClass(prefix + '-invalid');

                if (type !== 'checkbox' && type !== 'radio') {
                    $el.parent().find('.'+ prefix +'-efo-error-message').remove();
                    $el.parent().append('<div class="'+ prefix +'-efo-error-message">' + result.errorMessage + '</div>')
                }
            } else {
                $el.removeClass(prefix + '-invalid');

                if (type !== 'checkbox' && type !== 'radio') {
                    $el.parent().find('.'+ prefix +'-efo-error-message').remove();
                }
            }
        });

        $form.find('[name=email]').on('validate', function(e, result) {
            var $target = $form.find('[name=email-confirmation]');

            if (result.checkType === 'unit') {
                if (result.error) {
                    $target.prop('disabled', true);
                    $target.removeClass('unit-invalid').removeClass('relation-invalid');
                } else {
                    $target.prop('disabled', false);
                }
            }
        });

        $form.find('[name=email]').on('validate', function(e, result) {
            var $el = $(this),
                prefix = result.checkType,
                $parent = $el.parent(),
                $confirmation = $('[name=email-confirmation]');

            if (result.checkType === 'unit' && !$el.hasClass('relation-invalid')) {
                if (result.error) {
                    $el.addClass(prefix + '-invalid');

                    $el.parent().find('.'+ prefix +'-efo-error-message').remove();
                    $el.parent().append('<div class="'+ prefix +'-efo-error-message">' + result.errorMessage + '</div>')

                    if (result.eventtype === 'blur') {
                        $parent.removeClass('email-valid');
                    }
                } else {
                    $el.removeClass(prefix + '-invalid');

                    $el.parent().find('.'+ prefix +'-efo-error-message').remove();
                    if (result.eventtype === 'blur') {
                        $parent.addClass('email-valid');
                    }
                }
            }

            if (result.checkType === 'relation' && $confirmation.val()) {
                if (result.error) {
                    $el.addClass(prefix + '-invalid');

                    $el.parent().find('.efo-error-message').remove();
                    $el.parent().append('<div class="efo-error-message">' + result.errorMessage + '</div>')
                    $parent.removeClass('email-valid');
                } else {
                    $el.removeClass(prefix + '-invalid');

                    $el.parent().find('.efo-error-message').remove();
                    $parent.addClass('email-valid');
                }
            }
        });

        $form.find('[name=email-confirmation]').on('validate', function(e, result) {
            var $el = $(this),
                prefix = result.checkType,
                $parent = $el.parent(),
                bodyVal,
                confirmationVal = $el.val();

            if (result.checkType === 'unit' && !$el.hasClass('relation-invalid')) {
                if (result.error) {
                    $el.addClass(prefix + '-invalid');

                    $el.parent().find('.efo-error-message').remove();
                    $el.parent().append('<div class="efo-error-message">' + result.errorMessage + '</div>')
                    $parent.removeClass('email-valid');
                } else {
                    $el.removeClass(prefix + '-invalid');

                    $el.parent().find('.efo-error-message').remove();
                    $parent.addClass('email-valid');
                }
            }

            if (result.checkType === 'relation' && confirmationVal) {
                if (result.error) {
                    $el.addClass(prefix + '-invalid');

                    $el.parent().find('.efo-error-message').remove();
                    $el.parent().append('<div class="efo-error-message">' + result.errorMessage + '</div>')
                    $parent.removeClass('email-valid');
                } else {
                    $el.removeClass(prefix + '-invalid');

                    $el.parent().find('.efo-error-message').remove();
                    $parent.addClass('email-valid');
                }
            }

            if (result.checkType === 'relation' && result.targetType !== 'relation') {
                if (result.error || result.eventtype !== 'blur') {
                    bodyVal = result.relations.body[0].val();
                    confirmationVal = result.relations.confirmation[0].val();

                    if (bodyVal && confirmationVal && bodyVal === confirmationVal) {
                        $parent.addClass('email-valid');
                    } else {
                        $parent.removeClass('email-valid');
                    }

                } else if (result.eventtype === 'blur') {
                    $parent.addClass('email-valid');
                }
            }
        });
    });

    $(function() {
        $('input,textarea').inputHelper().on('ditectcredit', function(e, result) {
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
    });
}.call(window, $));
