describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})


describe("Login Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı girişte form submit edilir ve alert gösterilir", () => {
    cy.get('input[name="ad"]').type("Ali");
    cy.get('input[name="soyad"]').type("Veli");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Test123!");
    cy.get('input[name="accepted"]').check();

    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Giriş başarılı");
    });
  });

  it("Sadece email hatalı girildiğinde email hatası görünür, buton disabled kalır", () => {
    cy.get('input[name="ad"]').type("Ali");
    cy.get('input[name="soyad"]').type("Veli");
    cy.get('input[name="email"]').type("yanlisemail");
    cy.get('input[name="password"]').type("Test123!");
    cy.get('input[name="accepted"]').check();

    cy.contains("Geçerli bir eposta adresi giriniz.").should("exist");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Hem email hem şifre hatalı girildiğinde doğru iki hata görünür", () => {
    cy.get('input[name="ad"]').type("Ali");
    cy.get('input[name="soyad"]').type("Veli");
    cy.get('input[name="email"]').type("yanlis");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="accepted"]').check();

    cy.contains("Geçerli bir eposta adresi giriniz.").should("exist");
    cy.contains("Şifre en az 8 karakter olmalı").should("exist");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Kurallar kabul edilmeden giriş yapılamaz, hata görünür, buton disabled olur", () => {
    cy.get('input[name="ad"]').type("Ali");
    cy.get('input[name="soyad"]').type("Veli");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Test123!");

    cy.get('input[name="accepted"]').should("not.be.checked");
    cy.contains("Şartları kabul etmelisiniz.").should("exist");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Ad ve soyad kısa girildiğinde ilgili hata mesajları görünür ve buton disabled olur", () => {
    cy.get('input[name="ad"]').type("Al");
    cy.get('input[name="soyad"]').type("Ve");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Test123!");
    cy.get('input[name="accepted"]').check();

    cy.contains("Ad en az 3 karakter olmalı.").should("exist");
    cy.contains("Soyad en az 3 karakter olmalı.").should("exist");
    cy.get('button[type="submit"]').should("be.disabled");
  });
});
