//==============================================================================
// EXAMPLE 1
//==============================================================================
function example1($output) {

    alert('called');

    // jsonp request to twitter
    function getLatestTweets(callback) {

        // show a loader...
        $output.html('Making a Twitter JSONP request...');

        //$.getJSON('https://api.twitter.com/1/lists/show.json?callback=?', {}, function(data) {
        //$.getJSON('http://api.twitter.com/statuses/public_timeline.json?callback=?', {}, function(data) {
        $.getJSON(
            'https://api.twitter.com/1/lists/statuses.json?callback=?',
            { owner_screen_name: 'Skookum', slug: 'team' },
            function(data) {
                var output;
                try {
                    output = callback(data);
                    $output.removeClass('error');
                } catch(e) {
                    output = e.message;
                    $output.addClass('error');
                }
                output = output.toString().replace(/\n/g, '<br/>');
                $output.html(output);
            }
        );
    }

    /**
     * Retrieve the latest tweets from the Skookum twitter account and
     * display them via text.
     */
    getLatestTweets(function(t) {
        var users = t.map('user').unique();
        var total = users.sum('statuses_count').format();
        var top   = users.max('followers_count').first();
        var count = top.followers_count.format();
        var since = Date.create(top.created_at);
        return 'Returned ' + users.length + ' Skookum team members with a total of ' + total + ' tweets.\n' +
               top.screen_name + ' is the most followed with ' + count + ' followers\n' +
               'and started tweeting ' + since.relative() + '.';
    });

}