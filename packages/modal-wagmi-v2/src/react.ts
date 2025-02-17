import React from 'react';
import {createComponent} from '@lit/react'
import { RoninButton as elementClass } from '@roninbuilders/modal-ui';

export const RoninButton = createComponent({
  tagName: 'ronin-button',
  elementClass,
  react: React,
  events: {
    label: 'label',
  },
});