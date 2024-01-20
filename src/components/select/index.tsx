import { ChangeEventHandler } from 'react';

type SelectProps = {
  defaultValue: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  id: string;
  items: string[];
};

export const Select = ({
  defaultValue,
  handleChange,
  id,
  items,
}: SelectProps): JSX.Element => (
  <select defaultValue="" id={id} onChange={handleChange}>
    <option disabled value="">
      {defaultValue}
    </option>
    {items.map(item => (
      <option key={item}>{item}</option>
    ))}
  </select>
);
