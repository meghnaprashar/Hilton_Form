import React, { StatelessComponent } from "react";
import styled, { css } from "./styled-components";
import { range } from "lodash";
import { RoomProps } from "./types";

const Section = styled("div")<{ isActive?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 5px;
  border: solid 5px #e7e7e7;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: space-around;
  font-size: 9px;
  ${props =>
    !props.isActive &&
    css`
      border-color: #cdd0df;
      background-color: #dbdbe3;
    `}
`;

const Header = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Checkbox = styled("input")`
  margin-right: 5px;
`;

const Main = styled("div")<{ isActive?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  ${props =>
    !props.isActive &&
    css`
      background-color: #ffffff;
    `}
`;

const Fieldset = styled("div")`
  width: 50%;
`;

const Dropdown = styled("select")<{ isActive?: boolean }>`
  ${props =>
    !props.isActive &&
    css`
      background-color: #f0f0f0;
    `}
`;

const H3 = styled("h3")`
  margin-top: 0;
`;

const Room: StatelessComponent<RoomProps> = props => {
  const {
    name,
    label,
    toggleRoomActivation,
    isRequired,
    vacancies,
    requests,
    updateRoomRequests
  } = props;

  const isActive = props.isActive || props.isRequired;

  return (
    <Section isActive={isActive} data-testid="room" role="group">
      <Header role="group">
        {!isRequired && (
          <Checkbox
            type="checkbox"
            id={`${name}__checkbox`}
            name={name}
            data-testid={`${name}__checkbox`}
            checked={isActive}
            onChange={toggleRoomActivation}
          />
        )}
        <label htmlFor={`${name}__checkbox`}>
          <h2>{label}</h2>
        </label>
      </Header>
      <Main data-testid={`${name}__requests`} role="group">
        <Fieldset role="group">
          <label
            htmlFor={`${name}__requests--adult`}
            data-testid={`${name}__requests__label--adult`}
          >
            <H3>
              Adults
              <br />
              (18+)
            </H3>
          </label>
          <Dropdown
            id={`${name}__requests--adult`}
            name={`${name}--adult`}
            data-testid={`${name}__requests--adult`}
            disabled={!isActive}
            value={requests.adult}
            onChange={updateRoomRequests}
            onBlur={updateRoomRequests}
          >
            {range(1, vacancies.adult + 1).map(value => (
              <option
                key={`${name}__requests__dropdown__option--adult-${value}`}
                value={value}
              >
                {value}
              </option>
            ))}
          </Dropdown>
        </Fieldset>
        <Fieldset role="group">
          <label
            htmlFor={`${name}__requests--child`}
            data-testid={`${name}__requests__label--child`}
          >
            <H3>
              Children
              <br />
              (0 - 17)
            </H3>
          </label>
          <Dropdown
            id={`${name}__requests--child`}
            name={`${name}--child`}
            data-testid={`${name}__requests--child`}
            disabled={!isActive}
            value={requests.child}
            onChange={updateRoomRequests}
            onBlur={updateRoomRequests}
          >
            {range(0, vacancies.child + 1).map(value => (
              <option
                key={`${name}__requests__dropdown__option--child-${value}`}
                value={value}
              >
                {value}
              </option>
            ))}
          </Dropdown>
        </Fieldset>
      </Main>
    </Section>
  );
};

export default Room;
