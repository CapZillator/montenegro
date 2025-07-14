'use client';

import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { LocalizedLink } from '../../localized-link/LokalizedLink';
import { AddListing } from './components/add-listing/AddListing';
import { LanguageSwitcher } from './components/language-switcher/LanguageSwitcher';
import { User } from './components/user/User';
import { DropdownVariant } from './enums';

export const Header: FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownVariant | null>(
    null
  );

  const languageRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        languageRef.current?.contains(target) ||
        userRef.current?.contains(target)
      ) {
        return;
      }

      setActiveDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={classNames(
        'fixed flex justify-center shadow-md left-0 right-0 px-4 py-2 bg-primary/80 backdrop-blur-md z-40',
        'lg:px-5'
      )}
    >
      <div
        className={classNames(
          'flex items-center justify-between w-full max-w-container-xl'
        )}
      >
        <div>
          <LocalizedLink href="/">Logo</LocalizedLink>
        </div>
        <div className="flex items-center gap-4 ">
          <AddListing />
          <LanguageSwitcher
            isOpen={activeDropdown === DropdownVariant.LANGUAGE}
            onToggle={(open) =>
              setActiveDropdown(open ? DropdownVariant.LANGUAGE : null)
            }
            ref={languageRef}
          />
          <User
            isOpen={activeDropdown === DropdownVariant.USER}
            onToggle={(open) =>
              setActiveDropdown(open ? DropdownVariant.USER : null)
            }
            ref={userRef}
          />
        </div>
      </div>
    </header>
  );
};
