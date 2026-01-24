import { browser, $, $$, expect } from '@wdio/globals'
import { ChainablePromiseArray } from 'webdriverio'

describe('My Login application', () => {
    it('should demonstrate toBeElementsArrayOfSize', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')
        const elems = $$('input')
        await expect(elems).toBeElementsArrayOfSize(2)
    })

    it('should verify 0 elements', async () => {
        const elems = $$('non-existing-element')
        await expect(elems).toBeElementsArrayOfSize(0)
    })

    it.skip('should fail with filter', async () => {
        const elems = await $$('div').filter( el => el.isDisplayed())
        await expect(elems).toBeElementsArrayOfSize(1)
    })


    it('should be displayed', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await expect($('#username')).toBeDisplayed({
            message: 'Username input should be displayed on login page',
            wait: 1000
        })
    })   

    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            'You logged into a secure area!',
            { containing: true }
        )
            
        // Using some expect-webdriverio specific matchers
        await expect(browser).toHaveUrl('https://the-internet.herokuapp.com/secure')
        await expect(browser).toHaveTitle('The Internet')
    })

    it.skip('should have element & elements work with toBeEnabled', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        // await expect($('#username')).toHaveSize({ height: 32, width: 300 });

        // const nonAwaitedChaineableElement: ChainablePromiseElement = $('#username');
        const awaitedChaineableElement: ChainablePromiseElement = await $('#username');
        // const awaitedElement: WebdriverIO.Element = await $('#username').getElement();
        // // const test4: Promise<WebdriverIO.Element> = $('#username').getElement();

        // console.log('---Text---', await awaitedElement.getText());
        // await expect(nonAwaitedChaineableElement).toHaveText('');
        // await expect(awaitedChaineableElement).toHaveText('');
        // await expect(awaitedElement).toHaveText('');

        const nonAwaitedChaineableArray: ChainablePromiseArray = $$('#username');
        const awaitedChaineableArray: ChainablePromiseArray = await $$('#username');
        const elementArray: WebdriverIO.ElementArray = await $$('#username').getElements();
        const elements: WebdriverIO.Element[] = await (await $$('#username').getElements()).filter(el => el.isEnabled());
        // console.log(`testArray1 instance of promise`, testArray1 instanceof Promise);
        // console.log(`'getElements' in testArray1)`, 'getElements' in testArray1);
        // console.log(`'getElements' in testArray2)`, 'getElements' in testArray2);
        // console.log(`'getElements' in testArray3)`, 'getElements' in testArray3);
        // console.log(`'getElements' in testArray4)`, 'getElements' in testArray4);

        // await expect(nonAwaitedChaineableArray).toHaveText('');
        await expect(awaitedChaineableArray).toHaveText(['', ''], {wait : 1});
        // await expect(elementArray).toHaveText('t', {wait : 1});
        // await expect(elements).toHaveText('t', {wait : 1});

        // Error so not supporting $$()
        // await expect(awaitedChaineableArray).toHaveHTML('', {wait : 1});
        // await expect(elementArray).toHaveHTML('', {wait : 1});

        // Error so not supporting $$()
        // await expect(awaitedChaineableArray).toHaveElementClass('', {wait : 1});
        // await expect(elementArray).toHaveElementClass('', {wait : 1});

        // Error so not supporting $$()        
        // await expect(awaitedChaineableArray).toHaveComputedRole('', {wait : 1});
        // await expect(elementArray).toHaveComputedRole('', {wait : 1});

        // Error so not supporting $$()        
        // await expect(awaitedChaineableArray).toHaveComputedLabel('', {wait : 1});
        // await expect(elementArray).toHaveComputedLabel('', {wait : 1});
        
        // await expect(nonAwaitedChaineableArray).not.toBeElementsArrayOfSize(2, {wait : 1});
        // await expect(awaitedChaineableArray).not.toBeElementsArrayOfSize(2, {wait : 1});
        // await expect(elementArray).not.toBeElementsArrayOfSize(2, {wait : 1});
        // await expect(elements).toBeElementsArrayOfSize(2);
        
        // Passing to true without good reason
        // await expect(awaitedChaineableArray).toHaveElementProperty('', {wait : 1});
        // Fails `received?.getElement is not a function`
        // await expect(awaitedChaineableArray).toHaveElementProperty('t', {wait : 1});

        const test = await awaitedChaineableElement.getProperty('name');
        // <input type="text" name="username" id="username" />
        console.log('--- getProperty value ---', await test);
        // Passing to true without good reason
        // await expect(awaitedChaineableElement).toHaveElementProperty('', undefined, {wait : 1});
        // Fails `received?.getElement is not a function`
        await expect(awaitedChaineableElement).toHaveElementProperty('name');
        //await expect(awaitedChaineableElement).toHaveElementProperty('name1');

        // await expect($('#username')).toHaveHTML('<input type=\"text\" name=\"username\" id=\"username\" >')
        // await expect(await $('#username')).toHaveHTML('<input type=\"text\" name=\"username\" id=\"username\" >')
        // await expect(await $('#username').getElement()).toHaveHTML('<input type=\"text\" name=\"username\" id=\"username\" >')
        // await expect($('#username').getElement()).toHaveHTML('<input type=\"text\" name=\"username\" id=\"username\" >')

        // const awaitedGetElement = await $('#username').isEnabled();
        // console.log('--- getElement Checks ---', $('#username').isEnabled());
        // console.log('--- Enabled Checks ---');
        // console.log( 'getElement in await $(#username).getElement()', 'getElement' in awaitedGetElement);  

        //         const allKeys = [];
        // let p = awaitedGetElement;
        // while (p && p !== Object.prototype) {
        //     allKeys.push(...Object.getOwnPropertyNames(p));
        //     p = Object.getPrototypeOf(p);
        // }
        // console.log( 'All keys (including prototype):', allKeys);  
        // console.log('await $(#username).getElement()', awaitedGetElement);
        // console.log('awaitedGetElement.getElement', awaitedGetElement.getElement());


        // await expect($('#username')).toBeEnabled()
        // await expect(await $('#username')).toBeEnabled()
        // await expect(await $('#username').getElement()).toBeEnabled()

        // await expect($('#username').getElement()).toHaveHTML('<input type=\"text\" name=\"username\" id=\"username\" />')
        
        // const elements = $$('input').getElements()
        // console.log('--- Elements ---');        
        // console.log(`'getElements' in elements`, 'getElements' in elements);

        // const awaitedElements = await elements;
        // console.log('--- Awaited Elements ---');        
        // console.log(`'getElements' in awaitedElements`, 'getElements' in awaitedElements);
        // console.log(awaitedElements);


    })

    it.skip('should error when null is provided to stringContaining', async () => {
        expect("test").toEqual(expect.stringContaining(null));
    })

    it.skip('should have element & elements work with toBeEnabled', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        console.log('PageSource', await browser.getPageSource());

        // const nonAwaitedChaineableElement: ChainablePromiseElement = $('#username');
        const awaitedChaineableElement: ChainablePromiseElement = await $('#username');
        // const awaitedElement: WebdriverIO.Element = await $('#username').getElement();
        // // const test4: Promise<WebdriverIO.Element> = $('#username').getElement();

        // console.log('---Text---', await awaitedElement.getText());
        // await expect(nonAwaitedChaineableElement).toHaveText('');
        // await expect(awaitedChaineableElement).toHaveText('');
        // await expect(awaitedElement).toHaveText('');

        const nonAwaitedChaineableArray: ChainablePromiseArray = $$('div');
        const awaitedChaineableArray: ChainablePromiseArray = await $$('div');
        const elementArray: WebdriverIO.ElementArray = await $$('div').getElements();
        const elements: WebdriverIO.Element[] = await (await $$('div').getElements()).filter(el => el.isEnabled());
        
        // console.log('--- Elements ---', await awaitedChaineableArray.getElements());
        // await expect(nonAwaitedChaineableArray).toBeElementsArrayOfSize(12);
        // await expect(awaitedChaineableArray).toBeElementsArrayOfSize(12);
        // await expect(elementArray).toBeElementsArrayOfSize(12);
        // await expect(nonAwaitedChaineableArray).not.toBeElementsArrayOfSize(12);
        //await expect(awaitedChaineableArray).not.toBeElementsArrayOfSize(12);
        await expect(elementArray).not.toBeElementsArrayOfSize(12);
        
        await expect(elements).toBeElementsArrayOfSize(12);
        await expect(elements).not.toBeElementsArrayOfSize(12);
    })

    it.skip('toHaveText', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        // console.log('PageSource', await browser.getPageSource());

        const nonAwaitedChaineableElement: ChainablePromiseElement = $('label');
        const awaitedChaineableElement: ChainablePromiseElement = await $('label');
        const awaitedElement: WebdriverIO.Element = await $('label').getElement();

        const nonAwaitedChaineableArray: ChainablePromiseArray = $$('label');
        const awaitedChaineableArray: ChainablePromiseArray = await $$('label');
        const elementArray: WebdriverIO.ElementArray = await $$('label').getElements();
        const elements: WebdriverIO.Element[] =  await $$('label').filter(async el => await el.isEnabled());
        const mappedElements: WebdriverIO.Element[] = await $$('label').map( async el => el);
        
        // console.log('--- element ---', await awaitedElement.getElement());
        // console.log('--- element getElement ---', 'getElement' in await awaitedElement.getElement());
        // console.log('--- element getElement ---', 'getElement' in await awaitedElement);
        // console.log('--- element getElement - keys ---', Object.keys(await awaitedElement.getElement()));
        // console.log('--- element key ---', Object.keys(await awaitedElement));

        // console.log('nonExistingElement', await $('nonExistingElement').isExisting());
        // console.log('nonExistingElement', (await $('nonExistingElement').getElement()).isExisting());
        // console.log('--- element of element ---', await $('div').$('div'));
        // console.log('--- element of elements ---', await $$('div')[0].$('div'));
        // await expect((await awaitedChaineableArray.getElements()).length).not.toBeLessThan(2);
        // await expect(awaitedChaineableArray).toBeElementsArrayOfSize(2);
        // console.log('--- elementArray ---', elementArray);
        // console.log('--- elementArray 1---', await $$('label').getElements());
        // console.log('--- elementArray 2---', (await $$('label').getElements()).getElements());
        // console.log('--- elementArray 3---', await (await $$('label').getElements()).getElements());
        // console.log('--- element ---', await $('label'));
        // console.log('--- element ---', await $('test'));
        // console.log('--- element ---', await $('test').getElement());
        // console.log('--- element ---', await $('test').error);
        // console.log('--- element ---', typeof await $('test').error);
        // console.log('--- element ---', (await $('tests').error) instanceof Error);
        // console.log('--- elements ---', await $('test').getText());
        // console.log('--- elements ---', await $$('tests'));
        // console.log('--- awaitedElement ---', awaitedElement);
        // await expect(elementArray).toHaveText(['test', 'Password'], {wait : 1});
        // await expect($('test')).toHaveText('test');
        // await expect($$('test')).toHaveText('test');
        // await expect($$('test').filter(el => !el.isDisplayed())).toHaveText('test');

        
        // await expect(awaitedChaineableArray).toHaveText(['Password', 'Username'], {wait : 1});
        // await expect(awaitedChaineableArray).toHaveText(['Password', 'Username', 'toto'], {wait : 1});
        // await expect(awaitedChaineableArray).toHaveText(['Password'], {wait : 1});


        // await expect((await awaitedChaineableArray.getElements()).length).not.toBeLessThan(2);
        // await expect(awaitedChaineableArray).toHaveElementClass(['Username', 'Password'], {wait : 1});

        // const test = awaitedChaineableArray[0].$$('input');
        // console.log('--- test ---', await test);
        // await expect(awaitedChaineableArray).toHaveElementClass(['Password', 'Username'], {wait : 1});

        // $$('label').forEach( async (el) => {
        //     console.log('--- forEach element ---', await el.getText());
        // });


        // await expect($('test')).toBePresent()
        // await expect(await $('test').getElement()).not.toBeEnabled()
        // await expect(await $$('label')).toHaveText(['Username', 'Password']);
        /// console.log("await $$('label')", await $$('label').map( async el => await el.getText()));
        // await expect(await $$('label')).toHaveText(expect.arrayContaining(['Username', 'Password']));
        // await expect(await $$('label')).toHaveText(['Username', 'Password1']);
        // await expect(await $$('label')).toHaveText(['Username', 'Passord']);

        // const singleText = await $('label').getText()
        // expect(singleText).toEqual(expect.stringMatching(expect.arrayContaining(['Username', 'Password'])));
        
        const texts = await $$('label').map( async (el) => el.getText())
        // expect(text).toEqual(expect.arrayContaining(['Username', 'Password']));

        // await expect(await $$('label')).not.toHaveText(['Username', 'Password']);
        // await expect(await $('label')).not.toHaveText(['Username', 'Password']);
        // await expect(await $('label')).toHaveText('Username1');
        await expect(await $('label')).toHaveHTML('Username1');
        // expect(texts).not.toEqual(['Username', 'Password']);

        // expect('Username').not.toEqual('Username');

    })

    describe('Element at index of `$$`', function () {
        [ { expectedText: 'one', index: 0 },
            { expectedText: 'two', index: 2 },
            { expectedText: 'four', index: 4 },
        ].forEach(function ( { expectedText, index } ) {
            it("Element at $index of `$$('label')` is $expectedText", function () {
                expect($$('label')[index]).toHaveText(expectedText);
            });
        });
    });

    describe('takeElementScreenshot with scroll', () => {
        it.skip('should take screenshot of element after scrolling into view but fails', async () => {
            await browser.url('https://the-internet.herokuapp.com/login')

            const username = await $('#username')
            await expect(username).toBeDisplayed()
            const screenshot = await browser.takeElementScreenshot(await username.elementId, true)
            expect(screenshot).toBeDefined()
            // Optionally, you can add more assertions to verify the screenshot content
        })
    })

        describe.skip('closeWindow', () => {
        it('should take screenshot of element after scrolling into view', async () => {
            await browser.url('https://the-internet.herokuapp.com/login')
            await browser.url('https://the-internet.herokuapp.com/login')

            const username = await $('#username')            
            const handles = await browser.closeWindow()
            console.log('Handles after closeWindow:', handles);
        })
    })
    
})
