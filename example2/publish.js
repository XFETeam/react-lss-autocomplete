const ghpages = require('gh-pages')

ghpages.publish('build', {
  branch: 'gh-pages',
  repo: 'https://github.com/browniu/react-lss-autocomplete-example.git'
}, () => console.log('发布完成'))
