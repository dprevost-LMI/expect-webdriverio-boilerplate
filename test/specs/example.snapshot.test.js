import { browser, expect } from '@wdio/globals'
import path from "node:path";

describe('My Login application', () => {
    let snapshotService;

    before(async () => {
        const { SnapshotService } = await import('expect-webdriverio');
        snapshotService = SnapshotService.initiate({
            resolveSnapshotPath: (filePath, extension) => filePath + extension,
        });    
    });

    beforeEach(async function () {
        const testContext = {
            title: this.currentTest.title || "unknown-test",
            parent: path.basename(__filename, ".js").replace(".test", "").replace(".spec", ""),
            file: __filename,
        };
        await snapshotService.beforeTest(testContext);        
    });

    afterEach(async () => {
        await snapshotService.after();
    });

    it('should demonstrate snapshot service', async () => {
        await browser.url("https://webdriver.io");
        const heroSection = await browser.$(".hero");
        await expect(heroSection).toExist();
        await expect(heroSection).toMatchSnapshot();
        await expect(heroSection).toMatchSnapshot("hero-section-snapshot");
        const pageTitle = await browser.$("h1");
        await expect(pageTitle).toMatchSnapshot("page-title-snapshot");  
    })
})
