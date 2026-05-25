// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/LoginPage';
// import { readData } from '../utils/dataReader';

// const testData = readData('./testdata/LoginData.csv');
// const testData = readData('./testdata/LoginData.json');
// const testData = readData('./testdata/LoginData.xlsx', 'LoginData');

// test.describe('Login Test - Excel', () => {

//     for (const data of testData ) {
//         if (data.run !== 'yes') continue;

//         test(`Login test for:${data.username}`, async ({ page }) => {
//             const loginPage = new LoginPage(page);
//             await loginPage.gotoLoginPage();
//             await loginPage.login(data.username, data.password)
//             if (data.expected === 'success') {
//                 await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//             } else {
//                 await expect(loginPage.errorMessage).toBeVisible();
//             }
//         });
//       }
//  });




