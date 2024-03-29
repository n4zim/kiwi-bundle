
module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "no-shadow": "off",
        "no-undef": "off",
      },
    },
  ],
  rules: {
    "react-hooks/rules-of-hooks": "off",
    "react-native/no-inline-styles": "off",
    "prettier/prettier": 0,
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "react/react-in-jsx-scope": "off",
    "keyword-spacing": [
      "error",
      {
        overrides: {
          if: { after: false },
          for: { after: false },
          while: { after: false },
        },
      },
    ],
    "react/no-children-prop": 0,
    "react/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "never",
      },
    ],
    "react/no-unescaped-entities": "warn",
    "react/display-name": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
}
