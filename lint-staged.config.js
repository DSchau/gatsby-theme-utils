module.exports = {
  '*.js': [
    'eslint --ignore-path .gitignore --ignore-path .prettierignore --fix',
    'git add',
  ],
  '*.{md,yaml}': ['prettier --write', 'git add'],
};
