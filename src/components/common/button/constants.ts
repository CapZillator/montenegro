import { FindOnMapIcon } from '../icons';
import { Add } from '../icons/actions/Add';
import { Close } from '../icons/actions/Close';
import { DeleteStroke } from '../icons/actions/DeleteStroke';
import { Funnel } from '../icons/actions/Funnel';
import { Reset } from '../icons/actions/Reset';
import { Save } from '../icons/actions/Save';
import { UploadArrow } from '../icons/actions/UploadArrow';
import { ChevronRight } from '../icons/navigation/ChevronRight';
import { ButtonIcon } from './enums';

export const IconMap = {
  [ButtonIcon.ADD]: Add,
  [ButtonIcon.SAVE]: Save,
  [ButtonIcon.CLOSE]: Close,
  [ButtonIcon.DELETE]: DeleteStroke,
  [ButtonIcon.NEXT]: ChevronRight,
  [ButtonIcon.BACK]: ChevronRight,
  [ButtonIcon.UPLOAD]: UploadArrow,
  [ButtonIcon.RESET]: Reset,
  [ButtonIcon.FILTER]: Funnel,
  [ButtonIcon.FIND_ON_MAP]: FindOnMapIcon,
};
