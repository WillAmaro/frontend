// pnpmfile.js
module.exports = {
  hooks: {
    readPackage(pkg) {
      // eliminar scripts antes de instalar
      if (pkg.scripts) {
        pkg.scripts = {};
      }
      return pkg;
    },
  },
};