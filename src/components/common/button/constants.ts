import { Add } from "../icons/actions/Add";
import { Close } from "../icons/actions/Close";
import { DeleteStroke } from "../icons/actions/DeleteStroke";
import { Save } from "../icons/actions/Save";
import { UploadArrow } from "../icons/actions/UploadArrow";
import { ChevronRight } from "../icons/navigation/ChevronRight";
import { ButtonIcon } from "./enums";

export const IconMap = {
  [ButtonIcon.ADD]: Add,
  [ButtonIcon.SAVE]: Save,
  [ButtonIcon.CLOSE]: Close,
  [ButtonIcon.DELETE]: DeleteStroke,
  [ButtonIcon.NEXT]: ChevronRight,
  [ButtonIcon.BACK]: ChevronRight,
  [ButtonIcon.UPLOAD]: UploadArrow,
};
