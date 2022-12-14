import {login, pass} from './user.js';
import { faker } from '@faker-js/faker';

const { test, chromium, expect } = require("@playwright/test");

test("happyPath", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
    devtools: false
  });
  const page = await browser.newPage(); 

  page.goto("https://netology.ru");
  
  await page.locator('text=Войти').click();
  
  await page.locator('[placeholder="Email"]').fill(login);
  await page.locator('[placeholder="Пароль"]').fill(pass);

  await page.locator('[data-testid="login-submit-btn"]').click();

  const selector = page.locator(h2);
  await expect(selector).toHaveText("Мои курсы и профессии");

  
});

test("unHappyPath", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 300,
    devtools: false
  });
  const page = await browser.newPage(); 

  page.goto("https://netology.ru");
  
  await page.locator('text=Войти').click();
  const randomEmail = faker.internet.email();
  // рано или поздно , он подберет логин к этому паролю 
  await page.locator('[placeholder="Email"]').fill(randomEmail);
  await page.locator('[placeholder="Пароль"]').fill("password");

  const errorMessage = page.locator('[data-testid="login-error-hint"]');

  await expect(errorMessage).toHaveText("Вы ввели неправильно логин или пароль");

  
});


