import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

describe('E-commerce System Tests', function () {
  this.timeout(30000);
  let driver;
  let assert;

  before(async function () {
    // Dynamically import chai
    const chai = await import('chai');
    assert = chai.assert;

    // Set up headless Chrome
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless())
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should register a new user', async function () {
    await driver.get('http://localhost:3000/register');
    await driver.findElement(By.name('name')).sendKeys('Test User');
    await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.name('password')).sendKeys('password');
    await driver.findElement(By.name('confirmPassword')).sendKeys('password');
    await driver.findElement(By.css('button[type="submit"]')).click();
    let successMessage = await driver.findElement(By.css('.alert-success')).getText();
    assert.include(successMessage, 'Đăng ký thành công!');
  });

  it('should login with registered user', async function () {
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.name('password')).sendKeys('password');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.titleIs('Dashboard - User'), 10000);
    let title = await driver.getTitle();
    assert.strictEqual(title, 'Dashboard - User');
  });

  it('should add a new product', async function () {
    await driver.get('http://localhost:3000/admin/login');
    await driver.findElement(By.name('email')).sendKeys('admin@example.com');
    await driver.findElement(By.name('password')).sendKeys('password');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.titleIs('Dashboard - Admin'), 10000);

    await driver.get('http://localhost:3000/admin/products');
    await driver.findElement(By.css('a[href="/admin/products/create"]')).click();
    await driver.findElement(By.name('title')).sendKeys('New Product');
    await driver.findElement(By.name('price')).sendKeys('100');
    await driver.findElement(By.name('description')).sendKeys('This is a new product.');
    await driver.findElement(By.name('category')).sendKeys('Category 1');
    await driver.findElement(By.name('quantity')).sendKeys('10');
    await driver.findElement(By.css('button[type="submit"]')).click();

    let successMessage = await driver.findElement(By.css('.alert-success')).getText();
    assert.include(successMessage, 'Thêm sản phẩm thành công!');
  });

  it('should edit a product', async function () {
    await driver.get('http://localhost:3000/admin/products');
    await driver.findElement(By.css('a[href="/admin/products/edit/1"]')).click();
    await driver.findElement(By.name('title')).clear();
    await driver.findElement(By.name('title')).sendKeys('Updated Product');
    await driver.findElement(By.css('button[type="submit"]')).click();

    let successMessage = await driver.findElement(By.css('.alert-success')).getText();
    assert.include(successMessage, 'Cập nhật sản phẩm thành công!');
  });

  it('should delete a product', async function () {
    await driver.get('http://localhost:3000/admin/products');
    await driver.findElement(By.css('a[href="/admin/products/delete/1"]')).click();
    await driver.switchTo().alert().accept();

    let successMessage = await driver.findElement(By.css('.alert-success')).getText();
    assert.include(successMessage, 'Xóa sản phẩm thành công!');
  });

  it('should add product to cart', async function () {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.css('a[href="/product/1"]')).click();
    await driver.findElement(By.css('button[add-to-cart]')).click();

    let cartCount = await driver.findElement(By.css('.cart-count')).getText();
    assert.strictEqual(cartCount, '1');
  });

  it('should view cart', async function () {
    await driver.get('http://localhost:3000/cart');
    let cartItems = await driver.findElements(By.css('.cart-item'));
    assert.isAbove(cartItems.length, 0);
  });

  it('should update cart quantity', async function () {
    await driver.get('http://localhost:3000/cart');
    await driver.findElement(By.css('.cart-item-quantity')).clear();
    await driver.findElement(By.css('.cart-item-quantity')).sendKeys('2');
    await driver.findElement(By.css('button[update-cart]')).click();

    let cartQuantity = await driver.findElement(By.css('.cart-item-quantity')).getAttribute('value');
    assert.strictEqual(cartQuantity, '2');
  });

  it('should remove product from cart', async function () {
    await driver.get('http://localhost:3000/cart');
    await driver.findElement(By.css('button[remove-from-cart]')).click();

    let cartCount = await driver.findElement(By.css('.cart-count')).getText();
    assert.strictEqual(cartCount, '0');
  });

  it('should search for a product', async function () {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.name('search')).sendKeys('Product');
    await driver.findElement(By.css('button[type="submit"]')).click();

    let productTitle = await driver.findElement(By.css('.product-title')).getText();
    assert.include(productTitle, 'Product');
  });

  it('should sort products by price', async function () {
    await driver.get('http://localhost:3000');
    await driver.findElement(By.css('select[sort-by]')).sendKeys('Price');
    await driver.findElement(By.css('button[sort]')).click();

    let firstProductPrice = await driver.findElement(By.css('.product-price')).getText();
    assert.isNotNull(firstProductPrice);
  });

  it('should proceed to checkout', async function () {
    await driver.get('http://localhost:3000/cart');
    await driver.findElement(By.css('button[checkout]')).click();

    let checkoutTitle = await driver.findElement(By.css('.checkout-title')).getText();
    assert.include(checkoutTitle, 'Checkout');
  });

  it('should view order details after placing an order', async function () {
    await driver.get('http://localhost:3000/orders');
    await driver.findElement(By.css('a[href="/order/1"]')).click();

    let orderDetails = await driver.findElement(By.css('.order-details')).getText();
    assert.isNotNull(orderDetails);
  });
});