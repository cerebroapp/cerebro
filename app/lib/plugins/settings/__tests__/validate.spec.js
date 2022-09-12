import validate from '../validate'

const validSettings = {
  option1: {
    description: 'Just a test description',
    type: 'option',
    options: ['option_1', 'option_2'],
  },
  option2: {
    description: 'Just a test description',
    type: 'number',
    defaultValue: 0
  },
  option3: {
    description: 'Just a test description',
    type: 'number',
    defaultValue: 0
  },
  option4: {
    description: 'Just a test description',
    type: 'bool'
  },
  option5: {
    description: 'Just a test description',
    type: 'string',
    defaultValue: 'test'
  }
}

const invalidSettingsNoOptionsProvided = {
  option1: {
    description: 'Just a test description',
    type: 'option',
    options: [],
  }
}

const invalidSettingsInvalidType = {
  option1: {
    description: 'Just a test description',
    type: 'test'
  }
}

describe('Validate settings function', () => {
  it('returns true when plugin has no settings field', () => {
    const plugin = {
      fn: () => {}
    }
    expect(validate(plugin)).toEqual(true)
  })

  it('returns true when plugin has empty settings field', () => {
    const plugin = {
      fn: () => {},
      settings: {}
    }
    expect(validate(plugin)).toEqual(true)
  })

  it('returns true when plugin has valid settings', () => {
    const plugin = {
      fn: () => {},
      settings: validSettings
    }
    expect(validate(plugin)).toEqual(true)
  })

  it('returns false when option type is options and no options provided', () => {
    const plugin = {
      fn: () => {},
      settings: invalidSettingsNoOptionsProvided
    }
    expect(validate(plugin)).toEqual(false)
  })

  it('returns false when option type is incorrect', () => {
    const plugin = {
      fn: () => {},
      settings: invalidSettingsInvalidType
    }
    expect(validate(plugin)).toEqual(false)
  })
})
