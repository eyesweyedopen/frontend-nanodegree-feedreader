/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has URLs', function() {
            allFeeds.forEach((el) => {
                expect(el.url).toBeTruthy();
            });
        });

        it('has names', function() {
            allFeeds.forEach((el) => {
                expect(el.name).toBeTruthy();
            });
        });
        
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('changes visibility', function() {

            /* VARIABLES */
            const menu = $('.menu-icon-link');

            // fire a click event
            menu.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);  
            // fire a click event
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);  
        });

    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        // use done to perform async work with the ajax request in loadFeed
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are present in .feed', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* VARIABLES */
        // Feed arrays to compare two different feeds
        let oldFeed = [];
        let newFeed = [];

        // Random variables to make testing indexes dynamic
        const rand = Math.floor(Math.random() * 3);
        const otherRand = Math.abs(1 - rand);

        // Tracker boolean for comparison
        let isDifferent = false;

        // Setup for async callback to add entries to feed arrays
        beforeEach(function(done) {

            loadFeed(rand, function() {  
                $('.feed .entry').each((index, el) => {
                    oldFeed.push(el)
                }); 
                loadFeed(otherRand, function() {
                    $('.feed .entry').each((index, el) => {
                        newFeed.push(el)
                    });
                    done();
                });
            });

        });

        it('changes content on screen', function(done) {
            for (let i in oldFeed) {
                // As long as the entry in oldFeed is in newFeed, continue looking for a difference
                (oldFeed[i] in newFeed) ? isDifferent = false : isDifferent = true;
    
                // Once a difference is found, stop comparison
                if (isDifferent) {
                    break;
                };
            }

            // Make sure the feed arrays contain entries
            expect(oldFeed).toBeTruthy();
            expect(newFeed).toBeTruthy();
            
            // Check if feeds are different (contain at least one different entry)
            expect(isDifferent).toBe(true);
            done();
        });

    });

}());
