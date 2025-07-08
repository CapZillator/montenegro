import {
  AddIcon,
  ChevronRightIcon,
  CloseIcon,
  DeleteStrokeIcon,
  FindOnMapIcon,
  FunnelIcon,
  ResetIcon,
  SaveIcon,
  UploadArrowIcon,
} from '../icons';
import { ButtonIcon } from './enums';

export const IconMap = {
  [ButtonIcon.ADD]: AddIcon,
  [ButtonIcon.SAVE]: SaveIcon,
  [ButtonIcon.CLOSE]: CloseIcon,
  [ButtonIcon.DELETE]: DeleteStrokeIcon,
  [ButtonIcon.NEXT]: ChevronRightIcon,
  [ButtonIcon.BACK]: ChevronRightIcon,
  [ButtonIcon.UPLOAD]: UploadArrowIcon,
  [ButtonIcon.RESET]: ResetIcon,
  [ButtonIcon.FILTER]: FunnelIcon,
  [ButtonIcon.FIND_ON_MAP]: FindOnMapIcon,
};
