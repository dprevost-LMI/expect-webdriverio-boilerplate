import { browser, $, $$, expect } from '@wdio/globals'

/**
 * These tests are designed to FAIL to demonstrate failure outputs for specific assertions.
 */
describe('Expect Failure Demonstration', () => {
    beforeEach(async () => {
        await browser.url('https://the-internet.herokuapp.com/login')
    })

    describe('Multiple elements $$()', () => {
        // Actual text on page is likely: ['Username', 'Password']

        it.only('0. should fail when the text for the first element fails', async () => {
            await expect(await $$('label')).toHaveText('Password', { wait: 0 })
        })

        it('1. should fail when the text for the first element fails', async () => {
            await expect(await $$('label')).toHaveText(['Wrong', 'Password'], { wait: 0 })
        })

        it('2. should fail when the text for the second element fails', async () => {
            await expect(await $$('label')).toHaveText(['Username', 'Wrong'], { wait: 0 })
        })

        it('3. should fail when .not is used and texts match (simulating match failure)', async () => {
            await expect(await $$('label')).not.toHaveText(['Username', 'Password'], { wait: 0 })
        })

        it.only('4. should fail when .not is used and texts match (simulating match failure)', async () => {
            await expect(await $$('label')).toHaveText(['Username1', 'Password1', '1'], { wait: 0 })
        })        
    })

    describe('Single element $()', () => {
        // Actual text on page is likely: 'Username' (for the first label)

        describe('without .not', () => {
            it('should fail with single expected string', async () => {
                await expect(await $('label')).toHaveText('Wrong', { wait: 0 })
            })

            it('should fail with single expected array of string', async () => {
                await expect(await $('label')).toHaveText(['Wrong'], { wait: 0 })
            })
        })

        describe('with .not', () => {
            it('should fail with single expected string', async () => {
                await expect(await $('label')).not.toHaveText('Username', { wait: 0 })
            })

            it('should fail with single expected array of string', async () => {
                await expect(await $('label')).not.toHaveText(['Username'], { wait: 0 })
            })
        })
    })
})
