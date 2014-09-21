$(document).ready(function() {
    // set callback
    $(window).hashchange(setPage);

    // run function on page load
    $(window).hashchange();

    $("a").click(function(e) {
        var url = $(this).attr('href');
        var pat = /^https?:\/\//i;
        if (!pat.test(url))
        {
            e.preventDefault();
            if(history.pushState) {
                console.log("using pushState");
                history.pushState(null, null, url);
                setPage();
            }
            else {
                location.hash = url;
            }
        }

    });

});

// setPage reads the location hash and loads the appropriate content via ajax
function setPage() {
    var hash = location.hash.substr(1);
    if (!hash) {
        hash = 'about';
    }

    var node = $( '#' + hash + "-link");
    document.location.hash = hash;
    

    $('.nav a').removeClass('curr');
    node.addClass('curr');
    
    // If we aren't at the top:
    if (document.getElementsByTagName('body')[0].scrollTop > 0 || document.getElementsByTagName('html')[0].scrollTop > 0) {
        // Scroll to the top
        console.log("had to scroll");
        $("body, html").animate({ scrollTop: 0 }, 300, function() {
            switchContent(hash);
        });
    } else {
        switchContent(hash);
    }
}

function switchContent(hash) {
    // Turn the lights off..
    $('.body').fadeOut(200, function() {
        // Clear old content
        $('#content').html('');

        // If we have somewhere to go:
        if (hash != '') {
            // Load content using ajax
            $('#content').load("pages/" + hash + ".html", function( resp, status, xhr) {
                if (status == "error") {
                    var msg = "Whoops, something weird happened: ";
                    $("#error").html( msg + xhr.status + " " + xhr.statusText );
                } else {
                    $("#error").html(''); // clear the error box
                }

                // Now that we've done the switcheroo, we can turn the lights back on
                $('.body').fadeIn(300);
            });
        }
    });
}

