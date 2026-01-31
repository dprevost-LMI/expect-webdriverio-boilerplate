import { browser, expect } from '@wdio/globals'
import path from "node:path";

describe('My Login application', () => {
    let snapshotService: any | undefined;

    before(async () => {
        const { SnapshotService } = await import('expect-webdriverio');
        // Initialize the snapshot service using the static initiate method
        snapshotService = SnapshotService.initiate({
        resolveSnapshotPath: (filePath: string, extension: string) => filePath + extension,
        });    
    });

    beforeEach(async function () {
        const testContext = {
            title: this.currentTest.title || "unknown-test",
            parent: path.basename(__filename, ".ts").replace(".test", "").replace(".spec", ""),
            file: __filename,
        };

        await snapshotService.beforeTest(testContext);        
    });


    afterEach(async () => {
        await snapshotService.after();
    });

    it('should demonstrate snapshot service', async () => {
        await browser.url("https://webdriver.io");
        
        // Test basic toMatchSnapshot for elements
        const heroSection = await browser.$(".hero");
        await expect(heroSection).toExist();
        
        // Snapshot service is now properly initialized following the working pattern from:
        // https://github.com/dprevost-LMI/expect-webdriverio/blob/enhanced-expect-wdio-typing/test/snapshot.test.ts
        // These should now work with actual snapshot functionality!
        
        // Basic snapshot calls (these should work with the new setup)
        await expect(heroSection).toMatchSnapshot();
        await expect(heroSection).toMatchSnapshot("hero-section-snapshot");
        
        // Test with a different element to show multiple snapshots work
        const pageTitle = await browser.$("h1");
        await expect(pageTitle).toMatchSnapshot("page-title-snapshot");  
    })
})