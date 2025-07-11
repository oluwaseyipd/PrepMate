import { MODAL_TYPES } from '../../constants/modalTypes';

// Test modals
import { 
  SubmitTestModal, 
  StartTestModal, 
  CancelTestModal 
} from './test';

// Profile modals
import { 
  EditProfileModal, 
  DeleteAccountModal 
} from './profile';

// Course modals
import { 
  CreateCourseModal, 
  EditCourseModal, 
  DeleteCourseModal 
} from './course';

// Admin modals
import { 
  UserManagementModal, 
  SystemSettingsModal 
} from './admin';

export const modalRegistry = {
  [MODAL_TYPES.SUBMIT_TEST]: SubmitTestModal,
  [MODAL_TYPES.START_TEST]: StartTestModal,
  [MODAL_TYPES.CANCEL_TEST]: CancelTestModal,
  
  [MODAL_TYPES.EDIT_PROFILE]: EditProfileModal,
  [MODAL_TYPES.DELETE_ACCOUNT]: DeleteAccountModal,
  
  [MODAL_TYPES.CREATE_COURSE]: CreateCourseModal,
  [MODAL_TYPES.EDIT_COURSE]: EditCourseModal,
  [MODAL_TYPES.DELETE_COURSE]: DeleteCourseModal,
  
  [MODAL_TYPES.USER_MANAGEMENT]: UserManagementModal,
  [MODAL_TYPES.SYSTEM_SETTINGS]: SystemSettingsModal,
};