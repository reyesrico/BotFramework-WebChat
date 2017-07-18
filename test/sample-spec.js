var assert = require('assert'),
  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  SauceLabs = require("saucelabs"),
  username = "reyesrico",
  accessKey = "2fd95765-ca50-45d1-bf1f-f36033f8a036",
  saucelabs = new SauceLabs({
    username: username,
    password: accessKey
  });


// Run me:  
// ngrok ->         C:\Users\v-careye\Downloads\sc-4.4.7-win32\bin>sc -u reyesrico -k 2fd95765-ca50-45d1-bf1f-f36033f8a036
// run mocha!   ->  npm run mocha 

// My vars
var searchBox;
var test_name = "";
var until = webdriver.until;
var by = webdriver.By;

test.describe('Mock Test', function () {
  this.timeout(60000);

  var driver;

  //Before each test
  test.beforeEach(function () {
    var browser = 'chrome',
      version = '43.0',
      platform = 'Windows XP',
      server = "http://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:80/wd/hub";

    driver = new webdriver.Builder().
      withCapabilities({
        'browserName': browser,
        'platform': platform,
        'version': version,
        'username': username,
        'accessKey': accessKey
      }).
      usingServer(server).
      build();

    driver.getSession().then(function (sessionid) {
      driver.sessionID = sessionid.id_;
    });

    driver.wait(driver.get('http://localhost:3000/?domain=http://localhost:3000/mock'), 500);
    driver.wait(until.elementLocated(by.xpath("//div[@class = 'format-markdown']//p[contains(text(), 'MockBot')]")));
    searchBox = driver.findElement(webdriver.By.className("wc-shellinput"));
  });

  //After each test
  test.afterEach(function (done) {
    var passed = (this.currentTest.state === 'passed') ? true : false;

    driver.quit();

    saucelabs.updateJob(driver.sessionID, {
      name: test_name,
      passed: passed
    }, done);
  })


  // TESTS
  // Hi
  test.it('hi command', function () {
    var searchBox = driver.findElement(webdriver.By.className("wc-shellinput"));
    test_name = "hi command";
    searchBox.sendKeys('hi');
    searchBox.sendKeys(webdriver.Key.ENTER);
    driver.wait(until.elementLocated(by.xpath("//p[contains(text(), 'echo:')]")), 1000, 'Could not locate');
    return true;
  });


  // Animation
  test.it('animation command', function () {
    var searchBox = driver.findElement(webdriver.By.className("wc-shellinput"));
    test_name = "animation command";
    searchBox.sendKeys("animation");
    searchBox.sendKeys(webdriver.Key.ENTER);
    driver.wait(until.elementLocated(by.xpath("//img[contains(@src, 'surface_anim.gif')]")), 1000, 'Could not locate');
    return true;
  });

  // Audio
  test.it('audio command', function () {
    var searchBox = driver.findElement(webdriver.By.className("wc-shellinput"));
    test_name = "audio command";
    searchBox.sendKeys("audio");
    searchBox.sendKeys(webdriver.Key.ENTER);
    driver.wait(until.elementLocated(by.xpath("//audio[contains(@src, 'bftest.mp3')]")), 1000, 'Could not locate');
    return true;
  });
});