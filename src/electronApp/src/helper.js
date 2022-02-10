const development = process.env.NODE_ENV === "development" || false;
const isMac = process.platform === "darwin";
const isWindows = process.platform === "win32";
const isLinux = process.platform === "linux";
const verbosity = process.env.VERBOSE == "1" || false;

// module.exports = {
//     development,
//     isMac,
//     isWindows,
//     isLinux,
//     verbosity
// };

export { development, isMac, isWindows, isLinux, verbosity };