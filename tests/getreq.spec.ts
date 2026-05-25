import { test, expect } from "@playwright/test";
test('Get booking details by Id-pathparam', async ({ request }) => {

    const bookId = 2258; //we can pass this as path parameter

    // sending get request
    const response = await request.get('/booking/${bookingId}');

    // parse the response and print
    const responseBody = response.json();
    console.log(responseBody);

    // add assrtions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
})