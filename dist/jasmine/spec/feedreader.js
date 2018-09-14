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
                expect(el.url).toBeDefined();
                expect(el.url.length).not.toBe(0);
            });
        });

        it('has names', function() {
            allFeeds.forEach((el) => {
                expect(el.name).toBeDefined();
                expect(el.name.length).not.toBe(0);
            });
        });
        
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('changes visibility', function() {
            const menu = $('.menu-icon-link');
            menu.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);  
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);  
        });

    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are present in .feed', function(done) {
            const feed = $('.feed').children();
            const first = feed.first();
            expect(feed.length).not.toBe(0);
            expect(first.children().hasClass('entry')).toBe(true);
            done();
        });

    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        let oldFeed = [];
        $('.feed').children().each((el) => oldFeed.append(el));

        beforeEach(function(done) {
            loadFeed(Math.floor(Math.random() * 3), done);
        });

        it('changes content on screen', function(done) {
            const feedLength = (oldFeed.length >= $('.feed').children().length) ? $('.feed').children().length : oldFeed.length;
            expect(oldFeed[feedLength - 1] != $('.feed').children()[feedLength]).toBe(true);
            done();
        });

    });

}());
