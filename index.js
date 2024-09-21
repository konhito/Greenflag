const pp = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
pp.use(StealthPlugin());

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const url = "https://leetcode.com/accounts/login/";
const username = "username";
const pass = "pass";

const main = async () => {
  const browser = await pp.launch({
    // executablePath: "/usr/bin/google-chrome",
    headless: true,
    ignoreHTTPSErrors: true,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "load",
  });

  await page.waitForSelector('input[name="login"]');
  await page.type('input[name="login"]', username, { delay: 100 });

  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', pass, { delay: 100 });

  await delay(10000);
  await page.click("#signin_btn");
  await delay(7000);

  const page1 = await browser.newPage();
  await page1.goto("https://leetcode.com/submissions/detail/1397579855/", {
    waitUntil: "load",
  });
  await page1.click("#edit-code-btn", { delay: "100" });
  await delay(7000);
  await page1.keyboard.down("ControlLeft");
  await page1.keyboard.press("Enter");
  await delay(2000);
  await page1.keyboard.down("ControlLeft");
  await page1.keyboard.press("Enter");
  await delay(2000);
  await page1.keyboard.down("ControlLeft");
  await page1.keyboard.press("Enter");

  //   await page.click(
  //     "xpath/" +
  //       "/html/body/div[1]/div[1]/div[4]/div/div[2]/div[5]/div/div/div[2]/a[1]/div"
  //   );
  await delay(4000);
  await browser.close();
};

main();
