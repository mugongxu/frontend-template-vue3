const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`提交备注书写不规范.`)}\n\n` +
    chalk.red(`  请按照JFZ规范文档进行编写. 例如:\n\n`) +
    `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
    `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
    chalk.red(`  查看 http://192.168.172.44:9000/guide/feature.html#git-commit%E8%A7%84%E8%8C%83%E5%88%B6%E5%AE%9A%E4%B8%8E%E6%89%A7%E8%A1%8C 了解更多细节.\n`)
  );
  process.exit(1);
}
