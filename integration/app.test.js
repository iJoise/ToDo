describe('addItemForm', () => {
   it('base example, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:9009/iframe.html?id=todolists-additemform--add-item-form-example&args=&viewMode=story');
      const image = await page.screenshot();

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot();
   });
});

describe('AppWithRedux', () => {
   it('base example, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:9009/iframe.html?id=todolists-appwithredux--app-with-redux-example&args=&viewMode=story');
      const image = await page.screenshot();

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot();
   });
});

describe('EditableSpan', () => {
   it('base example, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:9009/iframe.html?id=todolists-editablespan--editable-span-example&args=&viewMode=story');
      const image = await page.screenshot();

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot();
   });
});

describe('todolists-task-task-is-done', () => {
   it('base example, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:9009/iframe.html?id=todolists-task--task-is-done-example&args=&viewMode=story');
      const image = await page.screenshot();

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot();
   });
});

describe('todolists-task-task-is-not-done', () => {
   it('base example, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:9009/iframe.html?id=todolists-task--task-is-not-done-example&args=&viewMode=story');
      const image = await page.screenshot();

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot();
   });
});
