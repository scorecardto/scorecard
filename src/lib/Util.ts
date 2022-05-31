import { Browser } from 'detect-browser';

import { Device } from './types/Device';

const transpose = (arr: any): any => {
  return (arr[0] ?? []).map((_: any, colIndex: number) =>
    arr.map((row: any) => row[colIndex])
  );
};

const extractBrowser = (browser: Browser | string): Device['browser'] => {
  if (
    browser === 'edge' ||
    browser === 'edge-chromium' ||
    browser === 'edge-ios'
  ) {
    return 'EDGE';
  }
  if (browser === 'chrome' || browser === 'chromium-webview') {
    return 'CHROME';
  }
  if (browser === 'firefox') {
    return 'FIREFOX';
  }
  if (browser === 'opera' || browser === 'opera-mini') {
    return 'OPERA';
  }
  if (browser === 'safari') {
    return 'SAFARI';
  }
  if (
    browser === 'android' ||
    browser === 'bb10' ||
    browser === 'aol' ||
    browser === 'beaker' ||
    browser === 'crios' ||
    browser === 'curl' ||
    browser === 'facebook' ||
    browser === 'fxios' ||
    browser === 'ie' ||
    browser === 'instagram' ||
    browser === 'ios' ||
    browser === 'ios-webview' ||
    browser === 'kakaotalk' ||
    browser === 'miui' ||
    browser === 'netfront' ||
    browser === 'phantomjs' ||
    browser === 'pie' ||
    browser === 'samsung' ||
    browser === 'searchbot' ||
    browser === 'silk' ||
    browser === 'yandexbrowser'
  ) {
    return 'OTHER_BROWSER';
  }
  return 'UFO';
};

const createInternalDeviceName = (
  browser: Device['browser'],
  platform: Device['os']
) => {
  if (browser === 'IOS') {
    return 'iPhone';
  }
  if (browser === 'ANDROID') {
    return 'Android Device';
  }
  if (browser === 'UFO') {
    return 'Unkown Device';
  }

  let returnable = '';

  if (browser === 'SAFARI') {
    returnable += 'Safari on ';
  } else if (browser === 'BRAVE') {
    returnable += 'Brave on ';
  } else if (browser === 'CHROME') {
    returnable += 'Chrome on ';
  } else if (browser === 'EDGE') {
    returnable += 'Edge on ';
  } else if (browser === 'FIREFOX') {
    returnable += 'Firefox on ';
  } else if (browser === 'OPERA') {
    returnable += 'Opera on ';
  } else if (browser === 'OTHER_BROWSER') {
    returnable += 'Unknown Browser on ';
  }

  if (platform === 'linux') returnable += 'Linux';
  else if (platform === 'aix') returnable += '"AIX"';
  else if (platform === 'android') returnable += 'Android';
  else if (platform === 'cygwin') returnable += '"Cygwin"';
  else if (platform === 'darwin') returnable += '"Darwin"';
  else if (platform === 'freebsd') returnable += '"FreeBSD"';
  else if (platform === 'haiku') returnable += '"Haiku"';
  else if (platform === 'netbsd') returnable += '"NetBSD"';
  else if (platform === 'openbsd') returnable += '"OpenBSD"';
  else if (platform === 'sunos') returnable += '"SunOS"';
  else if (platform === 'win32') returnable += 'Win32';
  else returnable += 'iOS';

  return returnable;
};

export { transpose, extractBrowser, createInternalDeviceName };
