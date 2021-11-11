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
const viewports = [...largeViewports, ...mobileViewports];

const setViewPort = (viewport) => {
  if (viewport.size) {
    cy.viewport(viewport.size[0], viewport.size[1]);
  } else {
    cy.viewport(viewport.preset, viewport.orientation);
  }
};

const getViewPortName = (viewport) => {
  if (viewport.size) {
    return viewport.size;
  }
  return `${viewport.preset}, ${viewport.orientation}`;
};

const selectHeaderLogo = "[data-cy='headerLogo']";
const selectMainTitle = "[data-cy='pageMainTitle']";
const selectMenuButton = "[data-cy='menuButton']";
const selectMenuListDesktop = "[data-cy='menuListDesktop']";
const selectMenuListMobile = "[data-cy='menuListMobile']";

const commonDesktopNavigationViaMenu = (path, lang = "") => {
  // Start from the index page
  cy.visit(lang);

  const pathLang = lang ? lang + "/" : "";

  // Find a link with an href attribute containing the path and click it
  cy.get(selectMenuListDesktop).should("be.visible");
  cy.get(selectMenuListMobile).should("be.not.visible");
  cy.get(selectMenuButton).should("be.not.visible");

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

const commonDesktopHomeNavigation = (lang = "") => {
  // Start from the index page
  cy.visit(lang);

  cy.get(selectMenuButton).should("be.visible");
  cy.get(selectHeaderLogo).should("be.visible");
  cy.get(selectMainTitle).should("be.visible");
};

const commonMobileHomeNavigation = (lang = "") => {
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

        it("using default language (german).", () => {
          commonMobileHomeNavigation();
        });

        it("using english.", () => {
          commonMobileHomeNavigation("en");
        });
      });
    });

    mobileViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("using default language (german).", () => {
          commonDesktopHomeNavigation();
        });

        it("using english.", () => {
          commonDesktopHomeNavigation("en");
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
