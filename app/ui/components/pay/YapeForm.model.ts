import { ButtonHTMLAttributes } from 'react';

export interface YapeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClose: () => void;
}