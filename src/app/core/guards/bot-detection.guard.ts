import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

const BOT_USER_AGENTS = ['bot', 'crawler', 'spider', 'crawling'];

export const botDetectionGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const agent = window.navigator.userAgent.toLowerCase();
  const isBot = BOT_USER_AGENTS.some((signature) => agent.includes(signature));
  return !isBot;
};

