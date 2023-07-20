require('dotenv').config()
const  puppeteer = require('puppeteer');

async function dataScrapper (page){
  await page.screenshot({path:'example.png'});
  await page.waitForSelector('[data-testid="component-shelf"]');

  const list = await page.evaluate(() => {
    const gridContainers = document.querySelectorAll('[data-testid="component-shelf"]');
    const extractedData = Array.from(gridContainers).map(container => {
      const divElements = Array.from(container.children).filter(child => child.tagName.toLowerCase() === 'div');
      console.log(divElements[0].querySelector('h2').textContent);
      const childElements = Array.from(divElements[1].children).filter(child => child.tagName.toLowerCase() === 'div');
      // return divElements.map(divElement => divElement.innerHTML);
      // return divElements[0].querySelector('a').getAttribute('href');
      return childElements.map(c => {
        return {Img: c.querySelector('img').src,title:c.querySelector('a').textContent,url:c.querySelector('a').getAttribute('href'),subtitle:c.querySelector('a').nextSibling.textContent};
      });
    });
    return extractedData;
  });
  
  
  
  console.log(list);
}


(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080
});

  // Navigate the page to a URL
  await page.goto('https://open.spotify.com');
  


  // Wait for the button to be visible and clickable
  await page.waitForSelector('button[data-testid="login-button"]');

  // Click the button
  await page.click('button[data-testid="login-button"]');
  await page.waitForNavigation();
  
  await page.type('#login-username',process.env.Mail)
  await page.type('#login-password',process.env.Password);
  await page.click('button[data-testid="login-button"]');

  await dataScrapper(page);
  // await browser.close();
})();


// (async () => {
//   // Launch the browser and open a new blank page
//   // const browser = await puppeteer.launch({headless: false});
//   const browser = await puppeteer.launch({
//     args: [
//       '--disable-blink-features=AutomationControlled',
//       '--disable-web-security',
//     ],
//     headless:false
//   });
//   const page = await browser.newPage();

//   await page.setViewport({
//     width: 1920,
//     height: 1080
// });

//   // Navigate the page to a URL
//   await page.goto('https://chat.openai.com/');
  
//   await page.screenshot({path:'example.png'});
  
//   // Wait for the button to be visible and clickable
//   // await page.waitForSelector('button[data-testid="login-button"]');
  
//   // // Click the button
//   await page.click('button');
//   await page.waitForSelector('form[data-provider="windowslive"]');

//     // Find the button element within the form and click it
//     const button = await page.$('form[data-provider="windowslive"] button[data-provider="windowslive"]');
//     await button.click();
//     await page.waitForNavigation();
//     await page.type('input','');
//     await page.click('input[value="Next"]');
//     page.waitForNavigation({ waitUntil: 'networkidle0' })
//     await page.type('input[name="passwd"]',');
//   //   // await page.click('input[data-report-event="Signin_Submit"]');
//   //   await page.click('input[type="submit"]');
//   // await page.waitForNavigation();
  
//   // await page.type('#login-username','')
//   // await page.type('#login-password',');
//   // await page.click('button[data-testid="login-button"]');

//   // await dataScrapper(page);
//   // await browser.close();
// })();

