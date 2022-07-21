module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  overrides: [
    {
      files: "*.ts",
      options: {
        parser: "typescript"
      }
    }
  ]
}
