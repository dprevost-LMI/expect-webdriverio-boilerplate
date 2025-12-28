import { browser, $, $$, expect } from '@wdio/globals'

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

    it.only('should be displayed after login', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await expect($('#usrname')).toBeDisplayed({
            message: 'Username input should be displayed on login page',
            wait: 60000
        })
    })    
})
