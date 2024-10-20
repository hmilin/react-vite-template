import { Builder } from '@builder.io/react';
import Avatar from './components/Avatar';
import Counter from './components/Counter/Counter';

Builder.registerComponent(Counter, {
  name: 'Counter',
  inputs: [
    {
      name: 'initialCount',
      type: 'number',
    },
  ],
});

Builder.registerComponent(Avatar, {
  name: 'Avatar',
  inputs: [
    {
      name: 'alt',
      type: 'string',
    },
    {
      name: 'children',
      type: 'string',
      hideFromUI: true,
      meta: {
        ts: 'any',
      },
    },
    {
      name: 'className',
      type: 'string',
    },
    {
      name: 'crossOrigin',
      type: 'string',
      enum: ['', 'anonymous', 'use-credentials'],
    },
    {
      name: 'gap',
      type: 'number',
    },
    {
      name: 'icon',
      type: 'string',
      meta: {
        ts: 'any',
      },
    },
    {
      name: 'nickname',
      type: 'string',
    },
    {
      name: 'prefixCls',
      type: 'string',
    },
    {
      name: 'rootClassName',
      type: 'string',
    },
    {
      name: 'shape',
      type: 'string',
      enum: ['circle', 'square'],
    },
    {
      name: 'size',
      type: 'string',
      enum: ['default', 'large', 'small'],
    },
    {
      name: 'src',
      type: 'string',
      meta: {
        ts: 'any',
      },
    },
    {
      name: 'srcSet',
      type: 'string',
    },
    {
      name: 'style',
      type: 'object',
      hideFromUI: true,
      meta: {
        ts: 'CSSProperties',
      },
    },
  ],
});
