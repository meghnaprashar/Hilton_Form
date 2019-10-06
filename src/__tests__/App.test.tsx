import React from "react";
import { render } from "react-testing-library";
import App from "../App";

describe("<App />: structure", () => {
  it("renders <App/> without crashing", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
