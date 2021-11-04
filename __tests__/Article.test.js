/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Article from "../components/Article";
import I18n from "../lib/i18n";

describe("Article", () => {
  it("renders a soft hyphen in body properly", () => {
    const rendered = render(
      <I18n language={"de"}>
        <Article body={"bodystart&shy;bodyend"} />
      </I18n>
    );
    expect(rendered.container).toHaveTextContent("bodystart\u00ADbodyend");
  });
});
