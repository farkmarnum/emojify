module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: "*.ts",
      options: {
        parser: "typescript"
      }
    }
  ]
}
