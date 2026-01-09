import { browser, $, $$, expect, multiremotebrowser } from '@wdio/globals'
import { AfterAssertionHookParams } from 'expect-webdriverio'
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
        const elems = await $$('div').filter(async el => await el.isDisplayed())
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

    describe('Multi-remote test', async () => {
        multiremotebrowser.instances.forEach(function (instance) {
            describe(`Test ${instance}`, function () {
                it('should have title "The Internet"', async function () {
                    const browser = multiremotebrowser.getInstance(instance)
                    await browser.url('https://the-internet.herokuapp.com/login')
                    
                    await expect(browser).toHaveTitle("The Internet");
                })
            });
        });
    });

    
        
    it('should have title per each remote instance', async () => {
        await multiremotebrowser.url('https://the-internet.herokuapp.com/login')
        await multiremotebrowser.instances.forEach(async (instanceName) => {
            const instance = multiremotebrowser.getInstance(instanceName);
            await expect(instance).toHaveTitle('The Internet')
        })
    })

    it('should have title per each remote instance', async () => {
        await multiremotebrowser.url('https://the-internet.herokuapp.com/login')

        await expect(multiremotebrowser.myChromeBrowser).toHaveTitle('The Internet')
        await expect(multiremotebrowser.myFirefoxBrowser).toHaveTitle('The Internet')
    })    

    // it.only('should have username and password element enabled with browser', async () => {
    //     await browser.url('https://the-internet.herokuapp.com/login')

    //     await expect($('#username')).toBeEnabled()
    //     await expect($('#password')).toBeEnabled()
    // })

    it('should have username and password element enabled with multiremotebrowser', async () => {
        await multiremotebrowser.url('https://the-internet.herokuapp.com/login')

        // await multiremotebrowser.pause(5000);
        // const title = await multiremotebrowser.getTitle();
        // console.log(title);


        // const multiRemoteElement: WebdriverIO.MultiRemoteElement = await multiremotebrowser.$('#username');
        // console.log('--- Multi Remote Element Awaited ---');
        // console.log(multiRemoteElement);

        // const test  = await multiRemoteElement.getElement();
        // console.log('--- Multi Remote Element getElement() ---');
        // console.log(test);


        const elementQuery = multiremotebrowser.myChromeBrowser.$('#username');
        console.log(elementQuery);
        const element = await multiremotebrowser.myChromeBrowser.$('#username');
        console.log('--- Chrome Browser Elements ---');
        console.log(element);


        // await expect($('#username')).toBeEnabled()
        // await expect($('#password')).toBeEnabled()

        await expect(multiremotebrowser.myChromeBrowser.$('#username')).not.toBeEnabled()
    }) 
    
    it('should show error for isNot', async () => {
        expect('title').not.toEqual('title')
    })

    it('should show error for isNot', async () => {
        await multiremotebrowser.myChromeBrowser.url('https://the-internet.herokuapp.com/login')
        await expect(multiremotebrowser.myChromeBrowser).not.toHaveTitle('The Internet')
    })  
    
    it('should show error for isNot', async () => {
        await multiremotebrowser.myChromeBrowser.url('https://the-internet.herokuapp.com/login')
        await expect(multiremotebrowser.myChromeBrowser).toHaveTitle('The Interne', {
            wait: 1000,
            message: 'Custom error message: title should not be "The Internet"',
            beforeAssertion: async (args) => {
                console.log('Before assertion hook executed', args);
            },
            afterAssertion: async (args: AfterAssertionHookParams) => {
                console.log('After assertion hook executed', args);
                console.log('Message was:', args.result.message());
                
            }   
        })
    })      

    it('should have element & elements work with toBeEnabled', async () => {
        const element: WebdriverIO.MultiRemoteElement = multiremotebrowser.$('#username')
        const elements: WebdriverIO.MultiRemoteElement[] = multiremotebrowser.$$('#username')
    })

    it.only('should have element & elements work with toBeEnabled', async () => {
        await multiremotebrowser.myChromeBrowser.url('https://the-internet.herokuapp.com/login')

        const nonAwaitedElement: ChainablePromiseElement = multiremotebrowser.myChromeBrowser.$('#username')
        console.log('--- Non Awaited Element ---');
        console.log(nonAwaitedElement);
        console.log(`'getElement' in element`, 'getElement' in nonAwaitedElement);
    
        const awaitedElement = await nonAwaitedElement.getElement();
        console.log('--- Awaited Element ---');
        console.log(awaitedElement);
        console.log(`'getElement' in awaitedElement`, 'getElement' in awaitedElement);
    })    
})
