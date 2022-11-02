import { ProxyOptions } from 'vite';
import dev from './proxy.dev';
import prod from './proxy.prod';
import uat from './proxy.uat';

export default {
  dev,
  uat,
  prod,
} as Record<string, Record<string, string | ProxyOptions>>;
