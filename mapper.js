const { complexModification, simpleModifications } = require('./config')
const fs = require('fs')
const path = require('path')

const complexRules = complexModification.map(getRule)
const homedir = require('os').homedir()
const karabinerConfigPath = path.join(
  homedir,
  '.config/karabiner/karabiner.json'
)

const karabinerConfig = require(karabinerConfigPath)

karabinerConfig.profiles[0].complex_modifications.rules = complexRules

// get device
karabinerConfig.profiles[0].devices.filter((d) => {
  const { identifiers } = d
  return identifiers.product_id === 591 && identifiers.vendor_id === 1452
})[0].simple_modifications = simpleModifications

fs.writeFileSync(karabinerConfigPath, JSON.stringify(karabinerConfig, null, 2))

fs.writeFileSync(
  path.resolve(__dirname, 'karabiner.json'),
  JSON.stringify(karabinerConfig, null, 2)
)

function getRule([key, to, modifiers]) {
  const [toKeyCode, ...toModifiers] = to
  return {
    description: `${to.join(' + ')} = ${key}${
      modifiers ? ` + ${modifiers.join(' + ')}` : ''
    }`,
    manipulators: [
      {
        type: 'basic',
        from: {
          modifiers: modifiers
            ? {
                mandatory: modifiers,
              }
            : undefined,
          key_code: key,
        },
        to: [
          {
            repeat: true,
            key_code: toKeyCode,
            modifiers: toModifiers,
          },
        ],
      },
    ],
  }
}
