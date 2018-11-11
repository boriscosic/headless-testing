module.exports = {
  after: function (browser) {
    browser.end();
  },

  'Demo test Google' : function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch js')
      .click('#lga')
      .waitForElementVisible('input[type=submit]', 1000)
      .click('input[type=submit]')
      .pause(1000)
      .assert.containsText('#search', 'nightwatch')
      .end();
  }
};
