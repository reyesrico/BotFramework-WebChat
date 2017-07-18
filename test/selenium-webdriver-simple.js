var webdriver = require('selenium-webdriver'),
    username = "reyesrico",
    accessKey = "2fd95765-ca50-45d1-bf1f-f36033f8a036",
    driver;
 
driver = new webdriver.Builder().
  withCapabilities({
    'browserName': 'chrome',
    'platform': 'Windows XP',
    'version': '43.0',
    'username': username,
    'accessKey': accessKey
  }).
  usingServer("http://" + username + ":" + accessKey +
              "@ondemand.saucelabs.com:80/wd/hub").
  build();
 
driver.get("http://saucelabs.com/test/guinea-pig");
 
driver.getTitle().then(function (title) {
    console.log("title is: " + title);
});
 
driver.quit();