import { HasChildren } from "@/shared/types";

export interface ModalPropsType extends HasChildren {
  closeModal: () => void;
  isWide?: boolean;
}
