import React from "react";
import { mount } from "enzyme";
import chai from "chai";
import Room from "../Room";

const setup = (propOverrides?: {
  isActive?: boolean;
  isRequired?: boolean;
}) => {
  const room = {
    name: "room-1",
    key: "room1",
    label: "Room 1",
    vacancies: {
      adult: 5,
      child: 3
    }
  };

  const props: any = {
    name: room.name,
    label: room.label,
    isActive: true,
    isRequired: false,
    toggleRoomActivation: jest.fn(),
    requests: { adult: 0, child: 0 },
    updateRoomRequests: chai.spy,
    vacancies: room.vacancies,
    ...propOverrides
  };

  const wrapper = mount(<Room {...props} />);

  return {
    wrapper,
    toggleRoomActivation: props.toggleRoomActivation,
    checkbox: wrapper.find(`input[data-testid='${room.name}__checkbox']`),
    dropdownAdult: wrapper.find(
      "select[data-testid='room-1__requests--adult']"
    ),
    dropdownChild: wrapper.find("select[data-testid='room-1__requests--child']")
  };
};

describe("<Room />: structure", () => {
  it("does not render checkbox when isRequired=true", () => {
    const { wrapper, checkbox } = setup({
      isRequired: true
    });
    expect(wrapper.exists());
    expect(checkbox.exists()).toBe(false);
  });

  it("is enabled when isActive=true", () => {
    const { wrapper, checkbox, dropdownAdult, dropdownChild } = setup();

    expect(wrapper.exists());
    expect(checkbox.exists());
    expect(dropdownAdult.exists());
    dropdownAdult.should.not.be.disabled();
    expect(dropdownChild.exists());
    dropdownChild.should.not.be.disabled();
  });

  it("is disabled when isActive=false and isRequired=false", () => {
    const { wrapper, checkbox, dropdownAdult, dropdownChild } = setup({
      isActive: false
    });

    expect(wrapper.exists());
    expect(checkbox.exists());
    expect(dropdownAdult.exists());
    dropdownAdult.should.be.disabled();
    expect(dropdownChild.exists());
    dropdownChild.should.be.disabled();
  });
});

describe("<Room />: behavior", () => {
  it("activates a disabled room", () => {
    const { wrapper, checkbox, toggleRoomActivation } = setup({
      isActive: false
    });
    expect(wrapper.exists());

    checkbox.should.not.be.checked();
    expect(toggleRoomActivation.mock.calls.length).toBe(0);
    checkbox.simulate("change", { target: { checked: true } });
    expect(toggleRoomActivation.mock.calls.length).toBe(1);
  });

  it("does not deactivae a required room", () => {
    const { wrapper, checkbox, toggleRoomActivation } = setup({
      isRequired: true
    });
    expect(wrapper.exists());

    expect(checkbox.exists()).toBe(false);
    expect(toggleRoomActivation.mock.calls.length).toBe(0);
  });

  it.skip("updates roomRequests when isActive=true", () => {});
});
