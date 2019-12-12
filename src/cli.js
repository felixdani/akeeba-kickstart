import arg from 'arg';
import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {
    promisify
} from 'util';
const access = promisify(fs.access);
const copy = promisify(ncp);
async function copyAkeebaFiles(options) {
    return copy(options.kickstartDirectory, options.targetDirectory, {
        clobber: false,
    });
}
export async function cli(args) {
    const currentFileUrl =
        import.meta.url;
    const kickstartDir = path.resolve(new URL(currentFileUrl).pathname, '../../kickstart');
    let options = {
        targetDirectory: process.cwd(),
        kickstartDirectory: kickstartDir,
    };
    try {
        await access(kickstartDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s something wrong with kickstart', chalk.red.bold('ERROR'));
        process.exit(1);
    }
    await copyAkeebaFiles(options);
    console.log('%s', chalk.green.bold(' Successfully copied Akeeba Kickstart files to ' + options.targetDirectory));
}