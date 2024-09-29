import type { ButtonProps } from 'vant';

export interface ButtonGroupProps extends ButtonProps {
  cancelVisible?: Boolean
  cancelText?: String
  confirmVisible?: Boolean
  confirmText?: String
}
