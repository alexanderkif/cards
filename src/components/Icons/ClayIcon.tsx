import { ComponentType } from 'react';
import './ClayIcon.scss';

export type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  fill?: string;
}>;

interface ClayIconProps {
  icon: IconComponent;
  size?: number;
  className?: string;
  tooltip?: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-right';
  onClick?: (e: React.MouseEvent) => void;
  'aria-label'?: string;
}

export function ClayIcon({
  icon: Icon,
  size = 28,
  className = '',
  tooltip,
  tooltipPosition = 'bottom',
  onClick,
  'aria-label': ariaLabel,
}: ClayIconProps) {
  return (
    <button
      className={`clay-icon ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || tooltip}
      type="button"
    >
      <Icon size={size} strokeWidth={1.5} fill="none" />
      {tooltip && (
        <span className={`clay-tooltip clay-tooltip-${tooltipPosition}`}>
          {tooltip}
        </span>
      )}
    </button>
  );
}

export default ClayIcon;
