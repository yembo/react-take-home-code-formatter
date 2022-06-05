interface OptionProps {
  label: string;
  value: string;
}

interface DropdownProps {
  isMultiple?: boolean;
  label: string;
  value: string | string[];
  options: OptionProps[];
  onChange: (event: any) => void;
}

const Dropdown = (props: DropdownProps) => {
  const { isMultiple, label, onChange, options, value } = props;
  return (
    <label>
      <div>{label}</div>
      <select multiple={isMultiple} onChange={onChange} value={value}>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
