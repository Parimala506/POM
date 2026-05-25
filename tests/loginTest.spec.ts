import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../testdata/LoginData.json';


test('valid login test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();

    // await loginPage.login('standard_user', 'secret_sauce'); hardcoded values

    await loginPage.login(loginData.valid_user.usename,
        loginData.valid_user.pasword);//new ones which is dynamic

    // await loginPage.verifyLoginSuccess(); assertions used old 
    expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); //new one
});

test('invalid login test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();

    // await loginPage.login('standard_user', 'secret_sauce'); hardcoded values

    await loginPage.login(loginData.invalid_user.usename,
        loginData.invalid_user.password);//new ones which is dynamic

    // await loginPage.verifyLoginSuccess(); assertions used old 
    
    expect(loginPage.errorMessage).toBeVisible();
    const errmsg = await loginPage.errorMessage.textContent();
    console.log(errmsg);
});



