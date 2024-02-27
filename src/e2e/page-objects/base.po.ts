import { browser, by, element, ExpectedConditions } from 'protractor';

export class PageObjectBase {
  private path: string;
  protected tag: string;

  constructor(tag: string, path: string) {
    this.tag = tag;
    this.path = path;
  }

  load() {
    return browser.get(this.path);
  }

  rootElement() {
    return element(by.css(this.tag));
  }

  waitUntilInvisible() {
    browser.wait(ExpectedConditions.invisibilityOf(this.rootElement()), 3000);
  }

  waitUntilPresent() {
    browser.wait(ExpectedConditions.presenceOf(this.rootElement()), 3000);
  }

  waitUntilNotPresent() {
    browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(this.rootElement())), 3000);
  }

  waitUntilVisible() {
    browser.wait(ExpectedConditions.visibilityOf(this.rootElement()), 3000);
  }

  getElement(sel: string) {
    return element(by.css(`${this.tag} ${sel}`));
  }

  getTitle() {
    return element(by.css(`${this.tag} ion-title`)).getText();
  }

  protected async enterInputText(sel: string, text: string): Promise<void> {
    const el = element(by.css(`${this.tag} ${sel}`));
    const inp = el.element(by.css('input'));
    await inp.sendKeys(text);
  }

  protected enterTextareaText(sel: string, text: string) {
    const el = element(by.css(`${this.tag} ${sel}`));
    const inp = el.element(by.css('textarea'));
    inp.sendKeys(text);
  }

  protected async clickButton(sel: string) {
    const el = element(by.css(`${this.tag} ${sel}`));
    await browser.wait(ExpectedConditions.elementToBeClickable(el));
    await el.click();
  }
}
