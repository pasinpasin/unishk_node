const puppeteer =require("puppeteer");
const path=require("path");



const pdfDoc= (async (url) => {
//console.log(req.params);
 const filePath = path.resolve(__dirname, `../public/temp/planet-${Date.now()}.pdf`);
  //const filename="medium.pdf"
  console.log(filePath);
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});
    await page.pdf({path: filePath, format: 'A4',landscape: true, printBackground: true})  ;
      await browser.close();
     return filePath;
      //res.download(filename);
      
});

const generatePDF2 = (async (url ) => {
  
    const filePath = path.resolve(__dirname, `../public/temp/planet-${Date.now()}.pdf`);
    console.log(filePath);
   //const url = "http://localhost:3000/api/v1/planpermbajtja?planetmesimore=" + req.params.id;
   console.log(url);
   const browser = await puppeteer.launch({ headless: "chrome" })
   const page = await browser.newPage();
   page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36 WAIT_UNTIL=load");
   await page.goto(url, {waitUntil: 'networkidle0'});
   await page.evaluate(() => { window.scrollBy(0, window.innerHeight); })
   await page.pdf({path: filePath, format: 'A4',landscape: true, printBackground: true})  ;
   
    await browser.close();
     

   //const filename = await pdfDoc(url + req.params.id);
   //console.log(url);
   //res.contentType("application/pdf");
   //res.sendFile(filePath);
return filePath;

});

module.exports = generatePDF2;