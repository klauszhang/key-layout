const { getPermutation } = require('./permutation')

const arrowKeys = [
  ['w', 'up_arrow'],
  ['s', 'down_arrow'],
  ['a', 'left_arrow'],
  ['d', 'right_arrow'],
]

const cursorKeys = [
  ['l', 'home'],
  ['comma', 'end'],
]

const functionKeys = [['2', 'f2']]

const editKeys = [['delete_or_backspace', 'delete_forward']]

function bindModifier(keyMap, modifier) {
  if (!Array.isArray(modifier)) {
    modifier = [modifier]
  }

  return keyMap.map((combo) => [combo[0], [combo[1]], modifier])
}

function bindTargetModifier(keyMap, fromModifier, toModifier) {
  if (!Array.isArray(toModifier)) {
    toModifier = [toModifier]
  }

  return keyMap.map((combo) => [
    combo[0],
    [combo[1], ...toModifier],
    [fromModifier, ...toModifier],
  ])
}

function bindPermutationModifier(keyMap, fromModifier, toModifiers) {
  // get permutations of modifiers
  const permutationMap = getPermutation(toModifiers.length)
  return permutationMap
    .map((map) => {
      return map.map((idx) => {
        return toModifiers[idx]
      })
    })
    .map((modifiers) => {
      return bindTargetModifier(keyMap, fromModifier, modifiers)
    })
    .flat()
}

// console.log(
//   JSON.stringify(
//     bindPermutationModifier(arrowKeys, 'fn', ['left_shift', 'left_option']),
//     null,
//     1
//   )
// )

const complexModification = [
  // arrow keys
  ...bindModifier(arrowKeys, 'fn'),
  ...bindPermutationModifier(arrowKeys, 'fn', [
    'right_shift',
    'left_shift',
    'left_option',
    'left_control',
    'left_command',
  ]),

  // cursor keys
  ...bindModifier(cursorKeys, 'fn'),
  ...bindTargetModifier(cursorKeys, 'fn', 'right_shift'),
  ...bindTargetModifier(cursorKeys, 'fn', 'left_shift'),

  // Edit keys
  ...bindModifier(editKeys, 'fn'),

  // function keys
  ...bindModifier(functionKeys, 'fn'),

  // others

  // ['caps_lock', ['left_option']],
  // ['left_control', ['fn']],
  // ['left_option', ['left_control']],
  // ['right_command', ['fn']]
]

const fn = {
  apple_vendor_top_case_key_code: 'keyboard_fn',
}
const leftOption = { key_code: 'left_option' }
const leftControl = { key_code: 'left_control' }
const rightCommand = { key_code: 'right_command' }
const capsLock = {
  key_code: 'caps_lock',
}

const simpleModifications = [
  [leftControl, fn],
  [leftOption, leftControl],
  [rightCommand, fn],
  [capsLock, leftOption],
].map(getRule)

function getRule([from, to]) {
  return {
    from,
    to: [to],
  }
}

module.exports = { complexModification, simpleModifications }
