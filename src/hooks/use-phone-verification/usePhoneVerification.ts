import { useEffect } from 'react';
import { useModal } from '@/components/common/modal/ModalContext';
import { GenericModal } from '@/components/common/generic-modal/GenericModal';
import { useCurrentUser } from '../use-current-user/useCurrentUser';

export const usePhoneVerification = (options?: { autoCheck?: boolean }) => {
  const { data: userData } = useCurrentUser();
  const { openModal, closeModal } = useModal();
  const autoCheck = options?.autoCheck ?? true;

  const showPhoneVerificationModal = () => {
    openModal('phone-verification', 
      <GenericModal 
        id="phone-verification" 
        onClose={() => closeModal('phone-verification')}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Phone Verification Required</h2>
          <p className="mb-4">Please add your phone number to continue using the platform.</p>
          {/* Add your phone verification form here */}
        </div>
      </GenericModal>
    );
  };

  useEffect(() => {
    if (autoCheck && userData?.needsPhone) {
      showPhoneVerificationModal();
    }

    return () => {
      closeModal('phone-verification');
    };
  }, [userData, openModal, closeModal, autoCheck]);

  return {
    needsPhone: userData?.needsPhone ?? false,
    showPhoneVerificationModal
  };
}; 