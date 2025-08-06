import { LatLngTuple } from 'leaflet';

import { NameValue } from '@/types/inputs';

export const DEFAULT_COORDS = [42.4304, 19.2594] as LatLngTuple;

export const LOCALIZED_CITIES: Record<string, NameValue[]> = {
  en: [
    {
      name: 'Podgorica',
      value: 'Podgorica',
    },
    {
      name: 'Nikšić',
      value: 'Nikšić',
    },
    {
      name: 'Herceg Novi',
      value: 'Herceg Novi',
    },
    {
      name: 'Budva',
      value: 'Budva',
    },
    {
      name: 'Kotor',
      value: 'Kotor',
    },
    {
      name: 'Bar',
      value: 'Bar',
    },
    {
      name: 'Tivat',
      value: 'Tivat',
    },
    {
      name: 'Ulcinj',
      value: 'Ulcinj',
    },
    {
      name: 'Bečići',
      value: 'Bečići',
    },
    {
      name: 'Dobrota',
      value: 'Dobrota',
    },
    {
      name: 'Risan',
      value: 'Risan',
    },
    {
      name: 'Perast',
      value: 'Perast',
    },
    {
      name: 'Sutomore',
      value: 'Sutomore',
    },
    {
      name: 'Petrovac',
      value: 'Petrovac',
    },
    {
      name: 'Rafailovići',
      value: 'Rafailovići',
    },
    {
      name: 'Dobra Voda',
      value: 'Dobra Voda',
    },
    {
      name: 'Pržno',
      value: 'Pržno',
    },
    {
      name: 'Igalo',
      value: 'Igalo',
    },
    {
      name: 'Bijela',
      value: 'Bijela',
    },
    {
      name: 'Baošići',
      value: 'Baošići',
    },
    {
      name: 'Utjeha',
      value: 'Utjeha',
    },
    {
      name: 'Đenovići',
      value: 'Đenovići',
    },
    {
      name: 'Krašići',
      value: 'Krašići',
    },
    {
      name: 'Bigova',
      value: 'Bigova',
    },
    {
      name: 'Buljarica',
      value: 'Buljarica',
    },
    {
      name: 'Cetinje',
      value: 'Cetinje',
    },
    {
      name: 'Pljevlja',
      value: 'Pljevlja',
    },
    {
      name: 'Andrijevica',
      value: 'Andrijevica',
    },
    {
      name: 'Petnjica',
      value: 'Petnjica',
    },
    {
      name: 'Šavnik',
      value: 'Šavnik',
    },
    {
      name: 'Žabljak',
      value: 'Žabljak',
    },
    {
      name: 'Gusinje',
      value: 'Gusinje',
    },
    {
      name: 'Plužine',
      value: 'Plužine',
    },
    {
      name: 'Mojkovac',
      value: 'Mojkovac',
    },
    {
      name: 'Bijelo Polje',
      value: 'Bijelo Polje',
    },
    {
      name: 'Berane',
      value: 'Berane',
    },
    {
      name: 'Rožaje',
      value: 'Rožaje',
    },
    {
      name: 'Kolašin',
      value: 'Kolašin',
    },
    {
      name: 'Tuzi',
      value: 'Tuzi',
    },
    {
      name: 'Danilovgrad',
      value: 'Danilovgrad',
    },
  ],
  ru: [
    {
      name: 'Подгорица',
      value: 'Podgorica',
    },
    {
      name: 'Никшич',
      value: 'Nikšić',
    },
    {
      name: 'Херцег-Нови',
      value: 'Herceg Novi',
    },
    {
      name: 'Будва',
      value: 'Budva',
    },
    {
      name: 'Котор',
      value: 'Kotor',
    },
    {
      name: 'Бар',
      value: 'Bar',
    },
    {
      name: 'Тиват',
      value: 'Tivat',
    },
    {
      name: 'Улцинь',
      value: 'Ulcinj',
    },
    {
      name: 'Бечичи',
      value: 'Bečići',
    },
    {
      name: 'Доброта',
      value: 'Dobrota',
    },
    {
      name: 'Рисан',
      value: 'Risan',
    },
    {
      name: 'Пераст',
      value: 'Perast',
    },
    {
      name: 'Сутоморе',
      value: 'Sutomore',
    },
    {
      name: 'Петровац',
      value: 'Petrovac',
    },
    {
      name: 'Рафаиловичи',
      value: 'Rafailovići',
    },
    {
      name: 'Добра Вода',
      value: 'Dobra Voda',
    },
    {
      name: 'Пржно',
      value: 'Pržno',
    },
    {
      name: 'Игало',
      value: 'Igalo',
    },
    {
      name: 'Биела',
      value: 'Bijela',
    },
    {
      name: 'Баошичи',
      value: 'Baošići',
    },
    {
      name: 'Утеха',
      value: 'Utjeha',
    },
    {
      name: 'Дженовичи',
      value: 'Đenovići',
    },
    {
      name: 'Крашичи',
      value: 'Krašići',
    },
    {
      name: 'Бигова',
      value: 'Bigova',
    },
    {
      name: 'Бульярица',
      value: 'Buljarica',
    },
    {
      name: 'Цетине',
      value: 'Cetinje',
    },
    {
      name: 'Плевля',
      value: 'Pljevlja',
    },
    {
      name: 'Андриевица',
      value: 'Andrijevica',
    },
    {
      name: 'Петница',
      value: 'Petnjica',
    },
    {
      name: 'Шавник',
      value: 'Šavnik',
    },
    {
      name: 'Жабляк',
      value: 'Žabljak',
    },
    {
      name: 'Гусинье',
      value: 'Gusinje',
    },
    {
      name: 'Плужине',
      value: 'Plužine',
    },
    {
      name: 'Мойковац',
      value: 'Mojkovac',
    },
    {
      name: 'Бијело-Поле',
      value: 'Bijelo Polje',
    },
    {
      name: 'Беране',
      value: 'Berane',
    },
    {
      name: 'Рожае',
      value: 'Rožaje',
    },
    {
      name: 'Колашин',
      value: 'Kolašin',
    },
    {
      name: 'Тузи',
      value: 'Tuzi',
    },
    {
      name: 'Даниловград',
      value: 'Danilovgrad',
    },
  ],
  cnr: [
    {
      name: 'Podgorica',
      value: 'Podgorica',
    },
    {
      name: 'Nikšić',
      value: 'Nikšić',
    },
    {
      name: 'Herceg Novi',
      value: 'Herceg Novi',
    },
    {
      name: 'Budva',
      value: 'Budva',
    },
    {
      name: 'Kotor',
      value: 'Kotor',
    },
    {
      name: 'Bar',
      value: 'Bar',
    },
    {
      name: 'Tivat',
      value: 'Tivat',
    },
    {
      name: 'Ulcinj',
      value: 'Ulcinj',
    },
    {
      name: 'Bečići',
      value: 'Bečići',
    },
    {
      name: 'Dobrota',
      value: 'Dobrota',
    },
    {
      name: 'Risan',
      value: 'Risan',
    },
    {
      name: 'Perast',
      value: 'Perast',
    },
    {
      name: 'Sutomore',
      value: 'Sutomore',
    },
    {
      name: 'Petrovac',
      value: 'Petrovac',
    },
    {
      name: 'Rafailovići',
      value: 'Rafailovići',
    },
    {
      name: 'Dobra Voda',
      value: 'Dobra Voda',
    },
    {
      name: 'Pržno',
      value: 'Pržno',
    },
    {
      name: 'Igalo',
      value: 'Igalo',
    },
    {
      name: 'Bijela',
      value: 'Bijela',
    },
    {
      name: 'Baošići',
      value: 'Baošići',
    },
    {
      name: 'Utjeha',
      value: 'Utjeha',
    },
    {
      name: 'Đenovići',
      value: 'Đenovići',
    },
    {
      name: 'Krašići',
      value: 'Krašići',
    },
    {
      name: 'Bigova',
      value: 'Bigova',
    },
    {
      name: 'Buljarica',
      value: 'Buljarica',
    },
    {
      name: 'Cetinje',
      value: 'Cetinje',
    },
    {
      name: 'Pljevlja',
      value: 'Pljevlja',
    },
    {
      name: 'Andrijevica',
      value: 'Andrijevica',
    },
    {
      name: 'Petnjica',
      value: 'Petnjica',
    },
    {
      name: 'Šavnik',
      value: 'Šavnik',
    },
    {
      name: 'Žabljak',
      value: 'Žabljak',
    },
    {
      name: 'Gusinje',
      value: 'Gusinje',
    },
    {
      name: 'Plužine',
      value: 'Plužine',
    },
    {
      name: 'Mojkovac',
      value: 'Mojkovac',
    },
    {
      name: 'Bijelo Polje',
      value: 'Bijelo Polje',
    },
    {
      name: 'Berane',
      value: 'Berane',
    },
    {
      name: 'Rožaje',
      value: 'Rožaje',
    },
    {
      name: 'Kolašin',
      value: 'Kolašin',
    },
    {
      name: 'Tuzi',
      value: 'Tuzi',
    },
    {
      name: 'Danilovgrad',
      value: 'Danilovgrad',
    },
  ],
};
