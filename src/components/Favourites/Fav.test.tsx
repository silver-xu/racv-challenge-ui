import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Fav } from "./Fav";

describe("Fav tests", () => {
  afterEach(cleanup);

  it("When checked is true should render fav-on.svg", () => {
    const { getByTestId } = render(<Fav checked={true} />);
    expect(getByTestId("fav")).toContainHTML("fav-on.svg");
  });

  it("When checked is false should render fav-off.svg", () => {
    const { getByTestId } = render(<Fav checked={false} />);
    expect(getByTestId("fav")).toContainHTML("fav-off.svg");
  });

  it("When clicked should toggle", () => {
    const { getByTestId } = render(<Fav checked={true} />);
    fireEvent.click(getByTestId("fav"));
    expect(getByTestId("fav")).toContainHTML("fav-off.svg");
    fireEvent.click(getByTestId("fav"));
    expect(getByTestId("fav")).toContainHTML("fav-on.svg");
  });

  it("When clicked should callback onChange", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <Fav checked={true} onChange={handleChange} />
    );
    fireEvent.click(getByTestId("fav"));
    expect(handleChange).toHaveBeenLastCalledWith(false);
    fireEvent.click(getByTestId("fav"));
    expect(handleChange).toHaveBeenLastCalledWith(true);
  });
});
