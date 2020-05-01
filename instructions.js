/**
 * adonis-feat
 *
 * (c) Ogbiyoyo, Emmanuel <ogbiyoyosky@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const path = require('path')


module.exports = async cli => {
    try {
        console.log("running ")
        await cli.copy(path.join(__dirname, 'templates/BaseFeature.js'), path.join(cli.helpers.appPath(), 'Features/BaseFeature.js'))
        cli.command.completed('create', 'Features/BaseFeature.js')
    } catch (error) {
        console.log(error)
    }
};