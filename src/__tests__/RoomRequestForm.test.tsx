import React from "react";
import { render, fireEvent, waitForElement } from "react-testing-library";
import RoomRequestForm from "../RoomRequestForm";
import axiosMock from "../__mocks__/axios";

const setup = async () => {
  const { container, getByTestId, queryAllByTestId, getByText, debug } = render(
    <RoomRequestForm />
  );

  const checkbox2: HTMLElement = await waitForElement(
    () => getByTestId(/room-2__checkbox/i, { exact: false }),
    { container }
  );
  const checkbox3: HTMLElement = await waitForElement(
    () => getByTestId(/room-3__checkbox/i, { exact: false }),
    { container }
  );
  const checkbox4: HTMLElement = await waitForElement(
    () => getByTestId(/room-4__checkbox/i, { exact: false }),
    { container }
  );
  const submit: HTMLElement = await waitForElement(
    () => getByText(/submit/i, { exact: false }),
    { container }
  );

  return {
    container,
    getByTestId,
    queryAllByTestId,
    getByText,
    debug,
    checkbox2,
    checkbox3,
    checkbox4,
    submit
  };
};

beforeEach(() => {
  // reset localStorage
  localStorage.clear();
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();
});

describe("<RoomRequestForm />: structure", () => {
  it("renders without crashing", async () => {
    const { container } = await waitForElement(() =>
      render(<RoomRequestForm />)
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("<RoomRequestForm />: behavior", () => {
  it("it checks local LocalStorage for cached state", async () => {
    await setup();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it("room activation works as expected", async () => {
    const { checkbox2, checkbox3, checkbox4 } = await setup();

    // initial form state
    expect(checkbox2).toHaveProperty("checked", false);
    expect(checkbox3).toHaveProperty("checked", false);
    expect(checkbox4).toHaveProperty("checked", false);

    // state after activating 3rd room
    fireEvent.click(checkbox3, { button: 0 });
    expect(checkbox2).toHaveProperty("checked", true);
    expect(checkbox3).toHaveProperty("checked", true);
    expect(checkbox4).toHaveProperty("checked", false);

    // state after deactivating 3rd room
    fireEvent.click(checkbox3, { button: 0 });
    expect(checkbox2).toHaveProperty("checked", true);
    expect(checkbox3).toHaveProperty("checked", false);
    expect(checkbox4).toHaveProperty("checked", false);
  });

  it("form submission works as expected", async () => {
    const { submit } = await setup();
    fireEvent.click(submit, { button: 0 });
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledTimes(1);
  });
});
