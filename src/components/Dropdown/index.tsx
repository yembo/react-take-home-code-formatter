interface OptionProps {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: OptionProps[];
  onChange: () => void;
}

const Dropdown = (props: DropdownProps) => {
  const { label, onChange, options, value } = props;

  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
