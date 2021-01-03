import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'uk.org.okonetwork.voicey',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;