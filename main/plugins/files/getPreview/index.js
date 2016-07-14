import React from 'react';

import Image from './preview/Image';
import Video from './preview/Video';
import Audio from './preview/Audio';
import Code from './preview/Code';
import Text from './preview/Text';
import Markdown from './preview/Markdown';

const IMAGE_REGEXP = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
const VIDEO_REGEXP = /\.(mp4|mov|ogg)$/i;
const AUDIO_REGEXP = /\.mp3$/i;
const TEXT_REGEXP = /\.txt$/i;
const MARKDOWN_REGEXP = /\.md$/i;

// TODO: add more languages here
const CODE_REGEXP = /\.(js|rb|php|py|rake|css|coffee|yml|json)$/i;

// Map of regexp → component
const components = new Map([
  [IMAGE_REGEXP, Image],
  [VIDEO_REGEXP, Video],
  [AUDIO_REGEXP, Audio],
  [CODE_REGEXP, Code],
  [TEXT_REGEXP, Text],
  [MARKDOWN_REGEXP, Markdown],
]);

// TODO: add preview for pdf, directories, archives
export default function (path) {
  let Preview = null;
  for (let [regexp, component] of components) {
    if (path.match(regexp)) {
      Preview = component;
      break;
    }
  }
  return Preview && <Preview path={path} />;
}
