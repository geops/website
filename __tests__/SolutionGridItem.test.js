/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import SolutionGridItem from "../components/SolutionGridItem";
import I18n from "../lib/i18n";

describe("SolutionGridItem", () => {
  it("display texts and images ", () => {
    const index = 0;
    const rendered = render(
      <I18n language={"de"}>
        <SolutionGridItem
          position={index}
          remaining={global.solutions.length - index - 1}
          solution={global.solutions[index]}
        />
      </I18n>
    );

    // Show title
    expect(rendered.container).toHaveTextContent("Maps");

    // Show summary
    expect(rendered.container).toHaveTextContent(
      "Karten für Mobilität und öffentlichen Verkehr"
    );

    // More image
    expect(screen.getByTestId("more").querySelector("svg")).toBeDefined();

    // Solution image
    expect(rendered.container.querySelector("img[src]").src).toBe(
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    );
  });
});
