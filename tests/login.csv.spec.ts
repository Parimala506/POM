import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { readCSV } from '../utils/csvReader';  // importing CSV file here

const loginData = readCSV('testdata/LoginData.csv'); //loads all test rows into memory
loginData.forEach((data: any) => {

    if (data.run !== 'true') return;
    test(`Login Test-${data.username}`, async ({ page }) => {
        // dynamic test name for each row, we create one test 
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.login(data.username, data.password);
         if (data.expected === 'success') {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        }
        else {
            await expect(loginPage.errorMessage).toBeVisible();
        }

    });
});
























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



