import { test, expect } from '@playwright/test';
import fs from 'fs';
// reading file
function readJson(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}
test('update booking{PUT}', async ({ request }) => {
    // createjson file path and storing res
    const requestBody = readJson('./testdata/postreqbody.json');
    const createResponse = await request.post("/booking", { data: requestBody });
    expect(createResponse.ok()).toBeTruthy();
    // extracting booking id from res
    const responseBody = await createResponse.json();
    const bookingId = responseBody.bookingid;
    console.log(bookingId);
    // token creation 
    const tokenRequestBody = readJson('./testdata/tokenreqbody.json');
    const tokenresponse = await request.post('/auth', { data: tokenRequestBody });
    expect(tokenresponse.ok()).toBeTruthy();
    // token validation 
    const tokenresponsebody = await tokenresponse.json();
    const token = tokenresponsebody.token;
    console.log(token);
    // printing ffffff

    // sending update req
    const updateRequestBody = readJson('./testdata/updatebooking.json');
    const updateresponse = await request.put(`/booking/${bookingId}`,
        {
            headers: { "cookie": `token=${token}` },
            data: updateRequestBody
        }
    );
    // validating res of udate
    expect(updateresponse.ok()).toBeTruthy();
    expect(updateresponse.status()).toBe(200);
    const updateresponsebody = await updateresponse.json();
    console.log(updateresponsebody);

})