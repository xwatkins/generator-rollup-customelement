'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the classy ' + chalk.red('generator-rollup-customelement') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your custom element name',
      default: 'my-component'
    }, {
      type: 'input',
      name: 'description',
      message: 'Description'
    }, {
      type: 'input',
      name: 'author',
      message: 'Author'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.camelCaseName = props.name
      .replace(/^([a-z])/g, g => g[0].toUpperCase())
      .replace(/-([a-z])/g, g => g[1].toUpperCase());
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author
      }
    );
    this.fs.copyTpl(
      this.templatePath('_rollup.config.js'),
      this.destinationPath('rollup.config.js'), {
        name: this.props.name,
        camelCaseName: this.props.camelCaseName        
      }
    );
    this.fs.copyTpl(
      this.templatePath('_src/_main.js'),
      this.destinationPath('src/main.js'), {
        name: this.props.name,
        camelCaseName: this.props.camelCaseName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('_examples/_index.html'),
      this.destinationPath('examples/index.html'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath('_.babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_.eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    );
  }

  install() {
    this.installDependencies({
      bower: false      
    });
  }
};
