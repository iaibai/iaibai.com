(function() {

    // Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",
            "https://code.jquery.com/jquery-3.2.1.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else {
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function($) {
            /******* Load CSS *******/
            var css_link = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: "http://static.iaibai.com/assets/production/dice.css"
            });
            css_link.appendTo('head');

            $('.dice-roller').each(function() {
                var sides = parseInt($(this).attr('data-dice-sides'));
                var quantity = parseInt($(this).attr('data-dice-quantity'));

                $(this).html('Sides: '+sides+'<br>Quantity: '+quantity+'<p class="dice-results">Results:</p><button class="roll-dice" type="button">Roll</button>');

                var parent = this;
                $(this).delegate('button.roll-dice', 'click', function() {
                    rollDice(parent, sides, quantity);
                });
            });
        });
    }

    function rollDice(parent, sides, quantity) {
        var jqxhr = jQuery.ajax({
                method: 'POST',
                url: "https://6vl6b4zrjk.execute-api.eu-west-1.amazonaws.com/dev",
                contentType: 'application/json',
                data: JSON.stringify([{sides: sides, quantity: quantity}])
            }
        )
            .done(function(data) {
                var html = '<ul>';
                for (var i in data[0].results) {
                    var result = data[0].results[i];
                    var tier = result>(sides/2) ? 'upper' : 'lower';
                    html += '<li class="dice-result-tier-'+tier+'">'+result+'</li>';
                }
                html += '</ul>';
                jQuery(parent).find('.dice-results').html(html);
            })
            .fail(function() {
                alert( "error" );
            });
    }

})(); // We call our anonymous function immediately