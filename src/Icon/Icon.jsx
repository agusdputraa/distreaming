import { icons } from "./Icons";

const Icon = ({ name, size = 20, color, className }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" is not registered`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
    />
  );
};

export default Icon;
