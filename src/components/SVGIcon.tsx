import React, { CSSProperties } from 'react';
import Icon from '@ant-design/icons';

interface IIconProps {
  component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  style?: CSSProperties;
  onClick?: () => void;
}

const SVGIcon = (props: IIconProps) => {
  return (
    <Icon
      component={props.component}
      width={14}
      height={14}
      style={props.style}
      onClick={props.onClick}
    />
  );
};

export default SVGIcon;
