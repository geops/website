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

const commonDesktopNavigationViaMenu = (path, lang = "") => {
  // Start from the index page
  cy.visit("http://localhost:3000/" + lang);

  const pathLang = lang ? lang + "/" : "";

  // Find a link with an href attribute containing the path and click it
  cy.get("#menuListDesktop").should("be.visible");
  cy.get("#menuListMobile").should("be.not.visible");
  cy.get("#menuButton").should("be.not.visible");

  const links = cy.get("#menuListDesktop a[href='/" + pathLang + path + "']");
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
  cy.visit("http://localhost:3000/" + lang);

  const pathLang = lang ? lang + "/" : "";

  // Find a link with an href attribute containing the path and click it
  cy.get("#menuListDesktop").should("be.not.visible");
  cy.get("#menuListMobile").should("be.not.visible");
  cy.get("#menuButton").should("be.visible");
  cy.get("#menuButton").click();
  cy.get("#menuListMobile").should("be.visible");

  // There is 2 links one for desktop one for mobil, at least one link should be visible.
  const links = cy.get("#menuListMobile a[href='/" + pathLang + path + "']");
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

describe("app", () => {
  describe("should navigate to home page", () => {
    largeViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("using default language (german).", () => {
          // Start from the index page
          cy.visit("http://localhost:3000/");

          cy.get("#menuButton").should("not.be.visible");
          cy.get("a[aria-label='geOps Logo']").should("be.visible");
          cy.get("div").contains("Performante Karten mit relevanten Inhalten");
        });

        it("using english.", () => {
          // Start from the index page
          cy.visit("http://localhost:3000/en");

          cy.get("#menuButton").should("not.be.visible");
          cy.get("a[aria-label='geOps Logo']").should("be.visible");
          cy.get("div").contains("High performance maps with focused content");
        });
      });
    });

    mobileViewports.forEach((viewport) => {
      describe("on " + (viewport.preset || viewport.size), () => {
        beforeEach(() => {
          setViewPort(viewport);
        });

        it("using default language (german).", () => {
          // Start from the index page
          cy.visit("http://localhost:3000/");

          cy.get("#menuButton").should("be.visible");
          cy.get("a[aria-label='geOps Logo']").should("be.visible");
          cy.get("div").contains("Performante Karten mit relevanten Inhalten");
        });

        it("using english.", () => {
          // Start from the index page
          cy.visit("http://localhost:3000/en");

          cy.get("#menuButton").should("be.visible");
          cy.get("a[aria-label='geOps Logo']").should("be.visible");
          cy.get("div").contains("High performance maps with focused content");
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
          cy.get("h1").contains("Unsere Lösungen");
        });

        it("to the about page", () => {
          commonDesktopNavigationViaMenu("about");
          cy.get("h1").contains("We map the future");
        });

        it("to the blog page", () => {
          commonDesktopNavigationViaMenu("blog");
          cy.get("h1").contains("Blog");
        });

        it("to the karriere page", () => {
          commonDesktopNavigationViaMenu("karriere");
          cy.get("h1").contains("Karriere");
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
          cy.get("h1").contains("Unsere Lösungen");
        });

        it("to the about page", () => {
          commonMobileNavigationViaMenu("about");
          cy.get("h1").contains("We map the future");
        });

        it("to the blog page", () => {
          commonMobileNavigationViaMenu("blog");
          cy.get("h1").contains("Blog");
        });

        it("to the karriere page", () => {
          commonMobileNavigationViaMenu("karriere");
          cy.get("h1").contains("Karriere");
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
          cy.get("h1").contains("Our solutions");
        });

        it("to the about page", () => {
          commonDesktopNavigationViaMenu("about", "en");
          cy.get("h1").contains("We map the future");
        });

        it("to the blog page", () => {
          commonDesktopNavigationViaMenu("blog", "en");
          cy.get("h1").contains("Blog");
        });

        it("to the karriere page", () => {
          commonDesktopNavigationViaMenu("career", "en");
          cy.get("h1").contains("Career");
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
          cy.get("h1").contains("Our solutions");
        });
        it("to the about page", () => {
          commonMobileNavigationViaMenu("about", "en");
          cy.get("h1").contains("We map the future");
        });
        it("to the blog page", () => {
          commonMobileNavigationViaMenu("blog", "en");
          cy.get("h1").contains("Blog");
        });
        it("to the karriere page", () => {
          commonMobileNavigationViaMenu("career", "en");
          cy.get("h1").contains("Career");
        });
      });
    });
  });
});
