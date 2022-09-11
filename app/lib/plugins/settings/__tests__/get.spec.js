import getUserSettings from '../get'

const plugin = {
  settings: {
    test_setting1: {
      type: 'string',
      defaultValue: 'test',
    },
    test_setting2: {
      type: 'number',
      defaultValue: 1,
    },
  }
}

describe('Test getUserSettings', () => {
  it('returns valid settings object', () => {
    expect(getUserSettings(plugin, 'test-plugin'))
      .toEqual({ test_setting1: 'test', test_setting2: 1 })
  })
})
