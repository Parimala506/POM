import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../testdata/LoginData.json';
import loginDataNew from '../testdata/LoginDataNew.json';

//loops through all records in JSON file 
loginDataNew.forEach((data) => {

    if (!data.run) return;
    //skip disable records 

    test(`Login Test - ${data.username}`, async ({ page }) => {
        //dynamic test creatd for user(based on the data set taken from JSON 
        // it will start working and execute below methods of that class )
        const loginPage = new LoginPage(page);
        loginPage.gotoLoginPage();
        loginPage.login(data.username, data.password);
        if (data.expected === 'success') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        }
        else {
            await expect(loginPage.errorMessage).toBeVisible();
        }
        //by all above code we can observe one thing each iteration becomes a separate test in Report 

    });


})


















// test('valid login test', async ({ page }) => {

//     const loginPage = new LoginPage(page);
//     await loginPage.gotoLoginPage();

//     // await loginPage.login('standard_user', 'secret_sauce'); hardcoded values

//     await loginPage.login(loginData.valid_user.usename,
//         loginData.valid_user.pasword);//new ones which is dynamic

//     // await loginPage.verifyLoginSuccess(); assertions used old
//     expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); //new one
// });

// test('invalid login test', async ({ page }) => {

//     const loginPage = new LoginPage(page);
//     await loginPage.gotoLoginPage();

//     // await loginPage.login('standard_user', 'secret_sauce'); hardcoded values

//     await loginPage.login(loginData.invalid_user.usename,
//         loginData.invalid_user.password);//new ones which is dynamic

//     // await loginPage.verifyLoginSuccess(); assertions used old

//     expect(loginPage.errorMessage).toBeVisible();
//     const errmsg = await loginPage.errorMessage.textContent();
//     console.log(errmsg);
// });



