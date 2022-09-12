module.exports = {
  app: {
    getPath: jest.fn(),
    getLocale: jest.fn(),
  },
  ipcRenderer: {
    on: jest.fn(),
  }
}
