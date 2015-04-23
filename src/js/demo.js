(function($) {
    'use strict';


    $(function() {
        var checkboxList = {},
            radioList = {};

        $('.checkbox-button').find('input[type=checkbox]').each(function() {
            var $this = $(this),
                name = $this.prop('name') || 'noname';

            checkboxList[name] = checkboxList[name] || [];
            checkboxList[name].push($this);
        }).on('validate', function(e, result) {
            var $el = $(this).closest('.checkbox-button');

            $el.toggleClass('unit-invalid', result.error);

            if (result.error) {
                $el.parent().find('.efo-error-message').remove();
                $el.after('<div class="efo-error-message">' + result.errorMessage + '</div>')
            } else {
                $el.parent().find('.efo-error-message').remove();
            }
        });

        $.each(checkboxList, function(name, list) {
            $.each(list, function(cnt, $checkbox) {
                $checkbox.on('change', function() {
                    $checkbox.closest('.checkbox-button').toggleClass('checked', $checkbox.prop('checked'));
                });
            });
        });

        $('.radio-button').find('input[type=radio]').each(function() {
            var $this = $(this),
                name = $this.prop('name') || 'noname';

            radioList[name] = radioList[name] || [];
            radioList[name].push($this);
        }).on('validate', function(e, result) {
            var $el = $(this).closest('.radio-button');

            $el.toggleClass('unit-invalid', result.error);

            if (result.error) {
                $el.parent().find('.efo-error-message').remove();
                $el.after('<div class="efo-error-message">' + result.errorMessage + '</div>')
            } else {
                $el.parent().find('.efo-error-message').remove();
            }
        });;

        $.each(radioList, function(name, list) {
            $.each(list, function(cnt, $radio) {
                $radio.on('change', function() {
                    setTimeout(function() {
                        var $form = $radio.closest('form');

                        if (!$form.size()) {
                            $form = $(document);
                        }
                        $form.find('input[name=' + name + ']').closest('.radio-button').removeClass('checked');
                        $radio.closest('.radio-button').addClass('checked');
                    });
                });
            });
        });
    });
}.call(window, $));