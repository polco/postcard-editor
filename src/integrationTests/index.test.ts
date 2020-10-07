import 'expect-puppeteer';

import { initialState } from 'redux/postcardReducer';

beforeAll(async () => {
    await page.goto('http://localhost:8081');
});

function getBackgroundUrl(selector: string) {
    return page.$eval(
        selector,
        (img) => (img as HTMLDivElement).style.backgroundImage
    );
}

test('can add a postcard, select it, remove it.', async () => {
    expect(await getBackgroundUrl('.PostcardView-image')).toBe(
        `url(\"${initialState.postcards[0].imageUrl}\")`
    );
    expect((await page.$$('.PostcardThumb')).length).toBe(3);

    // add new postcard
    await page.click('.PostcardList-add');

    // check it was added to the list
    expect((await page.$$('.PostcardThumb')).length).toBe(4);

    // wait for animation, the add button is above the postcard thumb
    await new Promise((cb) => setTimeout(cb, 200));

    // select the new postcard
    await page.click('.PostcardList > div.PostcardThumb:nth-child(4)');

    // check it is selected
    const thumbImg = await getBackgroundUrl(
        '.PostcardList > div.PostcardThumb--selected:nth-child(4)'
    );
    const selectedImg = await getBackgroundUrl('.PostcardView-image');
    expect(thumbImg).toBe(selectedImg);

    // delete the image
    await page.click(
        '.PostcardList .PostcardThumb--selected .PostcardThumb-remove'
    );

    // check it is deleted
    expect((await page.$$('.PostcardThumb')).length).toBe(3);
    expect(await getBackgroundUrl('.PostcardThumb--selected')).toBe(
        `url(\"${initialState.postcards[2].imageUrl}\")`
    );
    expect(await getBackgroundUrl('.PostcardView-image')).toBe(
        `url(\"${initialState.postcards[2].imageUrl}\")`
    );
});
