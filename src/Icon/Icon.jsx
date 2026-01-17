import { icons } from "./Icons";

/**
 * Icon Component
 * 
 * Renders an icon from the centralized icon registry.
 * 
 * @param {Object} props
 * @param {string} props.name - Icon name from registry
 * @param {number} props.size - Icon size (default: 20)
 * @param {string} props.color - Icon color
 * @param {string} props.className - Additional CSS classes
 */
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
