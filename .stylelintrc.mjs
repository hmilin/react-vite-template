import fabric from '@umijs/fabric';

/** @type {import('stylelint').Config} */
export default {
  ...fabric.stylelint,
  plugins: [...fabric.stylelint.plugins, 'stylelint-no-unsupported-browser-features'],
  rules: {
    ...fabric.stylelint.rules,
    "plugin/no-unsupported-browser-features": [true, {
      "browsers": [
        "Chrome >=88",
        "Firefox >=78",
        "Safari >=14.1",
        "Edge >=88"
      ],
      "ignore": ['css-nesting', 'css-not-sel-list'],
      "ignorePartialSupport": true
    }],
    "media-feature-range-notation": null
  }
};
