const largeViewports = [
  // Desktop
  {
    size: [1440, 900],
  },
];
const mobileViewports = [
  // Large mobile phone
  {
    preset: "samsung-s10",
    orientation: "portrait",
  },
];

const setViewPort = (viewport) => {
  if (viewport.size) {
    cy.viewport(viewport.size[0], viewport.size[1]);
  } else {
    cy.viewport(viewport.preset, viewport.orientation);
  }
};

const selectHeaderLogo = "[data-cy='headerLogo']";
const selectMainTitle = "[data-cy='pageMainTitle']";
const selectMenuButton = "[data-cy='menuButton']";
const selectMenuListDesktop = "[data-cy='menuListDesktop']";
const selectMenuListMobile = "[data-cy='menuListMobile']";
const deLinkDesktop = "[data-cy='deLinkDesktop']";
const enLinkDesktop = "[data-cy='enLinkDesktop']";
const deLinkMobile = "[data-cy='deLinkMobile']";
const enLinkMobile = "[data-cy='enLinkMobile']";

const commonDesktopNavigationViaMenu = (path, lang = "") => {
  // Start from the index page
  cy.visit(lang);

  const pathLang = lang ? lang + "/" : "";

  // Find a link with an href attribute containing the path and click it
  cy.get(selectMenuListDesktop).should("be.visible");
  cy.get(selectMenuListMobile).should("be.not.visible");
  cy.get(selectMenuButton).should("be.not.visible");

  if (lang == "en") {
    cy.get(enLinkMobile).should("not.exist");
    cy.get(enLinkDesktop).should("not.exist");
    cy.get(deLinkMobile).should("be.not.visible");
    cy.get(deLinkDesktop).should("be.visible");
  } else {
    // de
    cy.get(deLinkMobile).should("not.exist");
    cy.get(deLinkDesktop).should("not.exist");
    cy.get(enLinkMobile).should("be.not.visible");
    cy.get(enLinkDesktop).should("be.visible");
  }

  const links = cy
    .get(selectMenuListDesktop)
    .find("a[href='/" + pathLang + path + "']");
  links.should("to.have.length", 1);
  let indexVisible = 0;
  links.each((elt, idx) => {
    if (elt.is(":visible")) {
      indexVisible = idx;
    }
  });
  links.eq(indexVisible).click();

  // The new url should include "/solution"
  cy.url().should("include", "/" + pathLang + path);
};

const commonMobileNavigationViaMenu = (path, lang = "") => {
  // Start from the index page
  cy.visit(lang);

  const pathLang = lang ? lang + "/" : "";

  // Find a link with an href attribute containing the path and click it
  cy.get(selectMenuListDesktop).should("be.not.visible");
  cy.get(selectMenuListMobile).should("be.not.visible");
  cy.get(selectMenuButton).should("be.visible");
  cy.get(selectMenuButton).click();
  cy.get(selectMenuListMobile).should("be.visible");

  if (lang == "en") {
    cy.get(enLinkMobile).should("not.exist");
    cy.get(enLinkDesktop).should("not.exist");
    cy.get(deLinkMobile).should("be.visible");
    cy.get(deLinkDesktop).should("be.not.visible");
  } else {
    // de
    cy.get(deLinkMobile).should("not.exist");
    cy.get(deLinkDesktop).should("not.exist");
    cy.get(enLinkMobile).should("be.visible");
    cy.get(enLinkDesktop).should("be.not.visible");
  }

  // There is 2 links one for desktop one for mobil, at least one link should be visible.
  const links = cy
    .get(selectMenuListMobile)
    .find("a[href='/" + pathLang + path + "']");
  links.should("to.have.length", 1);
  let indexVisible = 0;
  links.each((elt, idx) => {
    if (elt.is(":visible")) {
      indexVisible = idx;
    }
  });
  links.eq(indexVisible).click();

  // The new url should include "/solution"
  cy.url().should("include", "/" + pathLang + path);
  cy.get(selectMainTitle).should("be.visible");
};

const commonMobileHomeNavigation = (lang = "") => {
  // Start from the index page
  cy.visit(lang);

  cy.get(selectMenuButton).should("be.visible");
  cy.get(selectHeaderLogo).should("be.visible");
  cy.get(selectMainTitle).should("be.visible");
};

const commonDesktopHomeNavigation = (lang = "") => {
  // Start from the index page
  cy.visit(lang);

  cy.get(selectMenuButton).should("not.be.visible");
  cy.get(selectHeaderLogo).should("be.visible");
  cy.get(selectMainTitle).should("be.visible");
};

describe("app", () => {
  describe("should navigate to home page", () => {
    largeViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("using default language (german) then navigate to english.", () => {
          commonDesktopHomeNavigation();
          cy.get(enLinkDesktop).click();
          cy.url().should("include", "/en");
          cy.get(deLinkDesktop).click();
          cy.wait(1000);
          cy.url().should("not.include", "/en");
        });

        it("using english then navigate to german", () => {
          commonDesktopHomeNavigation("en");
          cy.get(deLinkDesktop).click();
          cy.url().should("not.include", "/en");
          cy.get(enLinkDesktop).click();
          cy.wait(1000);
          cy.url().should("include", "/en");
        });
      });
    });

    mobileViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("using default language (german) then navigate to english.", () => {
          commonMobileHomeNavigation();
          cy.get(enLinkMobile).click({ force: true });
          cy.url().should("include", "/en");
          cy.get(deLinkMobile).click({ force: true });
          cy.wait(1000);
          cy.url().should("not.include", "/en");
        });

        it("using english then navigate to german.", () => {
          commonMobileHomeNavigation("en");
          cy.get(deLinkMobile).click({ force: true });
          cy.url().should("not.include", "/en");
          cy.get(enLinkMobile).click({ force: true });
          cy.wait(1000);
          cy.url().should("include", "/en");
        });
      });
    });
  });

  describe("should navigate from header menu using default language (german).", () => {
    largeViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("to the solution page", () => {
          commonDesktopNavigationViaMenu("solution");
        });

        it("to the about page", () => {
          commonDesktopNavigationViaMenu("about");
        });

        it("to the blog page", () => {
          commonDesktopNavigationViaMenu("blog");
        });

        it("to the karriere page", () => {
          commonDesktopNavigationViaMenu("karriere");
        });

        it("to en page", () => {
          commonDesktopNavigationViaMenu("karriere");
        });
      });
    });

    mobileViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("to the solution page", () => {
          commonMobileNavigationViaMenu("solution");
        });

        it("to the about page", () => {
          commonMobileNavigationViaMenu("about");
        });

        it("to the blog page", () => {
          commonMobileNavigationViaMenu("blog");
        });

        it("to the karriere page", () => {
          commonMobileNavigationViaMenu("karriere");
        });
      });
    });
  });

  describe("should navigate from header menu using english", () => {
    largeViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("to the solution page", () => {
          commonDesktopNavigationViaMenu("solution", "en");
        });

        it("to the about page", () => {
          commonDesktopNavigationViaMenu("about", "en");
        });

        it("to the blog page", () => {
          commonDesktopNavigationViaMenu("blog", "en");
        });

        it("to the karriere page", () => {
          commonDesktopNavigationViaMenu("career", "en");
        });
      });
    });

    mobileViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("to the solution page", () => {
          commonMobileNavigationViaMenu("solution", "en");
        });
        it("to the about page", () => {
          commonMobileNavigationViaMenu("about", "en");
        });
        it("to the blog page", () => {
          commonMobileNavigationViaMenu("blog", "en");
        });
        it("to the karriere page", () => {
          commonMobileNavigationViaMenu("career", "en");
        });
      });
    });
  });
});
