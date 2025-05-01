import React, { useSyncExternalStore } from 'react';
import {createComponent} from '@lit/react'
import { RoninButton as elementClass, getCore, subCore } from '@roninbuilders/modal-ui';

export const RoninButton = createComponent({
  tagName: 'ronin-button',
  elementClass,
  react: React,
  events: {
    label: 'label',
  },
});

export function useRNS(){
  return useSyncExternalStore(subCore.RNS, getCore.RNS, getCore.RNS);
}