import type { ButtonProps } from 'vant';

export interface EnhancedRouteLocation extends ButtonProps {
  cancelVisible?: Boolean
  cancelText: String
  confirmVisible: Boolean,
  confirmText: String,
}
