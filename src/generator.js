const state = {}

state.vowelsTable = [
  'an', 'ao', 'ai', 'ian',
  'ou', 'en', 'ang',
  'ing', 'iang', 'ong', 'iu',
  'eng', 'ei', 'uan',
  'in', 'iao', 'ia', 'ie',
  'ua', 'un', 'ue', 'er',
  'uang', 'uai', 'iong', 'üe'
]
state.friendsTable = {
  er: ['ing', 'uan'],
  uai: ['ing', 'ü', 'in', 'ue', 'üe'],
  ui: ['ü', 'ue', 'üe'],
  ü: ['uai', 'ui'],
  üe: ['ue', 'ui'],
  ue: ['üe', 'ui'],
  ong: ['iong'],
  iong: ['ong'],
  iang: ['uang'],
  uang: ['iang'],
  ia: ['ua'],
  ua: ['ia']
}
state.forceTable = [
  ['iang', 'uang'],
  ['iong', 'ong'],
  ['ing', 'uai'],
  ['ie', 'er'],
  ['üe', 'ue'],
  ['ia', 'ua']
]

state.keysTable = ['j', 'f', 'k', 'd', 'l', 's', 'h', 'g', 'r', 'w', 'q', 't', 'p', 'n', 'm', 'c', 'v', 'x', 'z', 'y', 'b']

function blankKeys () {
  if (state.keysTable.length === state.usedKeys.length) {
    return []
  }
  return state.keysTable.filter(key => state.usedKeys.indexOf(key) === -1)
}

export default function start (stats) {
  initState()
  const layout = {
    o: 'uo',
    v: 'ü ui'
  }
  let [vowels, _] = selectRecord(stats, '韵母')
  vowels = vowels.filter(vowel => vowel.length > 1)
  vowels = vowels.filter(vowel => vowel !== 'uo' && vowel !== 'ui' && vowel !== 'ü')

  const waitingVowels = ensureVowels(vowels)
  const remainsVowel = []

  while (true) {
    const vow = waitingVowels.shift()
    if (!vow) {
      break
    }
    const reg = new RegExp(`^${vow}之声母$`)
    const record = stats.find(row => reg.test(row.title))
    if (!record) {
      remainsVowel.push(vow)
      continue
    }

    const key = pickKey(vow, record.data[0])
    if (key) {
      assignKey(layout, key, vow)
    } else {
      remainsVowel.push(vow)
    }
  }

  // fill blank keys
  while (blankKeys().length) {
    assignKey(layout, blankKeys()[0], remainsVowel.shift())
  }

  const last = []
  remainsVowel.forEach(vow => {
    const friends = state.friendsTable[vow] || []
    let friendKey
    for (let i = 0; i < friends.length; i++) {
      const f = friends[i]
      const friendPosition = getKeyByValue(layout, f)
      if (friendPosition) {
        friendKey = friendPosition
        break
      }
    }
    if (friendKey) {
      assignKey(layout, friendKey, vow)
    } else {
      last.push(vow)
    }
  })

  if (!last.length) {
    return assignConsonants(stats, layout)
  }
  return null
}

function assignConsonants (stats, layout) {
  const consTable = ['zh', 'ch', 'sh', '_o']
  const keysTable = ['a', 'e', 'i', 'o', 'u']
  const assignedKeys = []
  const assignedCons = []
  let [cons, _] = selectRecord(stats, '声母')
  cons = cons.filter(con => consTable.indexOf(con) > -1)

  cons.forEach(con => {
    const [friends, _] = selectRecord(stats, `${con}之韵母`)
    const key = pickKey(con, friends)
    assign(key, con)
    assignedKeys.push(key)
    assignedCons.push(con)
  })

  function pickKey (con, keys) {
    let ret
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (assignedKeys.indexOf(key) === -1 && keysTable.indexOf(key) > -1) {
        ret = key
        break
      }
    }
    return ret
  }

  function assign (key, value) {
    if (layout[key]) {
      layout[key] += ` ${value}`
    } else {
      layout[key] = value
    }
  }

  if (assignedCons.length === consTable.length) {
    return layout
  }

  const last = consTable.filter(con => assignedCons.indexOf(con) === -1)
  const freeKeys = keysTable.filter(key => assignedKeys.indexOf(key) === -1)

  if (last.length > freeKeys.length) {
    console.error('no enough keys', last, freeKeys)
    return layout
  }

  last.forEach(con => {
    const key = freeKeys.shift()
    assign(key, con)
  })

  return layout
}
function ensureVowels (fromUser) {
  if (fromUser.length > state.vowelsTable.length) {
    throw new Error('Error: vowels number')
  }
  if (fromUser.length === state.vowelsTable.length) {
    return fromUser
  }

  state.vowelsTable.forEach(vow => {
    if (fromUser.indexOf(vow) < 0) {
      fromUser.push(vow)
    }
  })
  return fromUser
}

function assignKey (layout, key, vow) {
  if (forceToFriend.call(state, vow)) {
    return
  }
  if (layout[key]) {
    layout[key] += ` ${vow}`
  } else {
    layout[key] = vow
    state.usedKeys.push(key)
  }

  function forceToFriend (vow) {
    let isForced = false
    for (let i = 0; i < state.forceTable.length; i++) {
      const [a, b] = state.forceTable[i]
      if (vow === a || vow === b) {
        const key = getKeyByValue(layout, a) || getKeyByValue(layout, b)
        if (key) {
          layout[key] += ` ${vow}`
          isForced = true
          break
        }
      }
    }
    return isForced
  }
}

function pickKey (vow, keys) {
  let ret
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (state.usedKeys.indexOf(key) === -1 && state.keysTable.indexOf(key) > -1) {
      ret = key
      break
    }
  }
  return ret
}

function getKeyByValue (obj, v) {
  return Object.keys(obj).find(key => obj[key] === v)
}

function selectRecord (stats, title) {
  return stats.find(ele => ele.title === title).data
}

function initState () {
  state.usedKeys = ['v']
}
