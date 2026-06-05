import { test, expect } from '@playwright/test';
import fs from 'fs';

function readJson(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

//  creating new booking
test('Delete booking end-to-end', async ({ request }) => {
    const postrequestBody = readJson('./testdata/postreqbody.json');
    const postresponse = await request.post("/booking", { data: postrequestBody });
    const postresponseBody = await postresponse.json();
    console.log(postresponseBody);
    const bookingid = postresponseBody.bookingid;
    console.log("Booking is created ...");
    console.log("Bookingid ==>", bookingid);

    // gettng booking id
    const getresponse = await request.get(`/booking/${bookingid}`);
    const getresponsebody = await getresponse.json();
    console.log("Booking details are........");
    console.log(getresponsebody);

    // creating token as part of updatebooking  
    const tokenRequestBody = readJson('./testdata/tokenreqbody.json');
    const tokenresponse = await request.post('/auth', { data: tokenRequestBody });
    const tokenresponsebody = await tokenresponse.json();
    const token = await tokenresponsebody.token;
    console.log("Token -->", token);

    // updating PUT req
    const updateRequestBody = readJson('./testdata/updatebooking.json');
    const updateresponse = await request.put(`/booking/${bookingid}`,
        {
            headers: { "cookie": `token=${token}` },
            data: updateRequestBody
        }
    );

    // delete booking
    const deleteresponse = await request.delete(`/booking/${bookingid}`,
        {
            headers: { "cookie": `token=${token}` },

        }
    );
    // expect(deleteresponse.statusText()).toBe("created");
    expect(deleteresponse.status()).toBe(201);
    console.log("booking deleted successfully ");
})