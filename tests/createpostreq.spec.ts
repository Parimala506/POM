import { test, expect } from "@playwright/test";
import fs from "fs";
test("create post req using json external file", async ({ request }) => {

    //read data from json (request body) here
    const jsonFile = "./testdata/postreqbody.json";
    const requestBody = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

    //send post request
    const response = await request.post("https://restful-booker.herokuapp.com/booking",
        { data: requestBody });

    const responseBody = await response.json();
    console.log(responseBody);

    // validating status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // validate response body
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    //validate booking details 
    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds,
    });

    // validate booking dates (nested json object)
    expect(booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout,
    });
})