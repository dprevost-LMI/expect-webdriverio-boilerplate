import { browser, $, $$, expect } from '@wdio/globals'

describe('Expect Failure Demonstration', () => {
    beforeEach(async () => {
        await browser.url('https://the-internet.herokuapp.com/login')
    })

    describe('Multiple elements $$()', () => {
        it.only('0. should fail when the text for the first element fails', async () => {
            await expect($$('label')).toHaveText('Password', { wait: 0 })
        })
        // ...rest of the test cases, remove TS types
    })

    // ...rest of the test cases, remove TS types
})
