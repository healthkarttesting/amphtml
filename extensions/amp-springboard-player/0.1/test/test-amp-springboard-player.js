/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  createIframePromise,
  doNotLoadExternalResourcesInTest,
} from '../../../../testing/iframe';
import '../amp-springboard-player';
import {adopt} from '../../../../src/runtime';

adopt(window);

describe('amp-springboard-player', () => {

  function getSpringboardPlayer(attributes) {
    return createIframePromise().then(iframe => {
      doNotLoadExternalResourcesInTest(iframe.win);
      const bc = iframe.doc.createElement('amp-springboard-player');
      for (const key in attributes) {
        bc.setAttribute(key, attributes[key]);
      }
      bc.setAttribute('width', '480');
      bc.setAttribute('height', '270');
      bc.setAttribute('layout', 'responsive');
      iframe.doc.body.appendChild(bc);
      bc.implementation_.layoutCallback();
      return bc;
    });
  }

  it('renders', () => {
    return getSpringboardPlayer({
      'data-site-id': '261',
      'data-mode': 'video',
      'data-content-id': '1578473',
      'data-player-id': 'test401',
      'data-domain': 'test.com',
      'data-items': '10',
    }).then(bc => {
      const iframe = bc.querySelector('iframe');
      expect(iframe).to.not.be.null;
      expect(iframe.tagName).to.equal('IFRAME');
      expect(iframe.src).to.equal('https://cms.springboardplatform.com/' +
          'embed_iframe/261/video/1578473/test401/test.com/10');
    });
  });

  it('renders responsively', () => {
    return getSpringboardPlayer({
      'data-site-id': '261',
      'data-mode': 'video',
      'data-content-id': '1578473',
      'data-player-id': 'test401',
      'data-domain': 'test.com',
      'data-items': '10',
    }, true).then(bc => {
      const iframe = bc.querySelector('iframe');
      expect(iframe).to.not.be.null;
      expect(iframe.className).to.match(/-amp-fill-content/);
    });
  });

  it('requires data-site-id', () => {
    return getSpringboardPlayer({}).should.eventually.be
        .rejectedWith(/The data-site-id attribute is required for/);
  });

});
