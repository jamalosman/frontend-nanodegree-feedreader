/* global jasmine,$,allFeeds,it,describe,expect */
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('are all populated with URLs', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        it('are all populated with names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe('The menu', function () {

        var body = $('body');

        it('is hidden', function () {
            expect(body.hasClass("menu-hidden")).toBe(true);
        });

        var menuIcon = $('.menu-icon-link');

        
        it('hides when the menu icon is clicked', function () {
            expect(body.hasClass("menu-hidden")).toBe(true);
            menuIcon.click();
            expect(body.hasClass("menu-hidden")).toBe(false);
            menuIcon.click();
            expect(body.hasClass("menu-hidden")).toBe(true);
        });

    });

    describe('Initial Entries', function () {
        // load the initial entries
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // check the entries have been loaded
        it('have loaded', function (done) {
            var entries = $('.entry');
            expect(entries).toBeDefined();
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        var firstEntries, secondEntries;

        // load the first entries, and then the second entries (after the first have arrived)
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstEntries = $('.entry');
                loadFeed(1, function () {
                    secondEntries = $('.entry');
                    done();
                });
            });
        });

        it('is replacing previous content', function (done) {
            // check out of bounds issues
            expect(allFeeds[0]).toBeDefined();
            expect(allFeeds[1]).toBeDefined();

            // check that dom elements have been populated
            expect(firstEntries).toBeDefined();
            expect(secondEntries).toBeDefined();

            // chech that the list of entries are not identical
            expect(firstEntries.contents()).not.toBe(secondEntries.contents());
            done();
        });
    });


}());