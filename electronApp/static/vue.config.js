/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: "./",
    lintOnSave: "warning",
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        }
    }
}