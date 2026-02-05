import { useState, useEffect } from 'react'

const FORTUNES = [
  { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler', cat: 'wisdom' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson', cat: 'wisdom' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds', cat: 'wisdom' },
  { text: 'The most dangerous phrase in the language is: We\'ve always done it this way.', author: 'Grace Hopper', cat: 'wisdom' },
  { text: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', author: 'Antoine de Saint-Exupery', cat: 'wisdom' },
  { text: 'The only way to go fast, is to go well.', author: 'Robert C. Martin', cat: 'wisdom' },
  { text: 'It works on my machine.', author: 'Every Developer Ever', cat: 'joke' },
  { text: 'There are only two hard things in Computer Science: cache invalidation and naming things.', author: 'Phil Karlton', cat: 'joke' },
  { text: '99 little bugs in the code, 99 little bugs. Take one down, patch it around, 127 little bugs in the code.', author: 'Developer Folklore', cat: 'joke' },
  { text: 'If debugging is the process of removing bugs, then programming must be the process of putting them in.', author: 'Edsger Dijkstra', cat: 'joke' },
  { text: 'Weeks of coding can save you hours of planning.', author: 'Unknown', cat: 'joke' },
  { text: 'A SQL query walks into a bar, walks up to two tables, and asks... "Can I join you?"', author: 'Developer Folklore', cat: 'joke' },
  { text: '!false — it\'s funny because it\'s true.', author: 'Developer Folklore', cat: 'joke' },
  { text: 'Why do programmers prefer dark mode? Because light attracts bugs.', author: 'Developer Folklore', cat: 'joke' },
  { text: 'There are 10 types of people in the world: those who understand binary and those who don\'t.', author: 'Unknown', cat: 'joke' },
  { text: 'Deleted code is debugged code.', author: 'Jeff Sickel', cat: 'wisdom' },
  { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs', cat: 'wisdom' },
  { text: 'Programming is not about typing, it\'s about thinking.', author: 'Rich Hickey', cat: 'wisdom' },
]

function CowBubble({ text }) {
  const maxWidth = 50
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = line ? line + ' ' + word : word
    }
  }
  if (line) lines.push(line)

  const width = Math.min(maxWidth, Math.max(...lines.map(l => l.length)))
  const border = '-'.repeat(width + 2)
  const padded = lines.map(l => l.padEnd(width))

  if (padded.length === 1) {
    return `< ${padded[0]} >`
  }

  const middle = padded.map((l, i) => {
    if (i === 0) return `/ ${l} \\`
    if (i === padded.length - 1) return `\\ ${l} /`
    return `| ${l} |`
  })

  return [` ${border}`, ...middle, ` ${border}`].join('\n')
}

export default function Fortune({ theme }) {
  const [fortune] = useState(() => FORTUNES[Math.floor(Math.random() * FORTUNES.length)])
  const [count, setCount] = useState(0)

  const bubble = CowBubble({ text: fortune.text })
  const cow = [
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||',
  ].join('\n')
  const full = bubble + '\n' + cow

  useEffect(() => {
    if (count >= full.length) return
    const timer = setTimeout(() => setCount(c => c + 3), 8)
    return () => clearTimeout(timer)
  }, [count, full.length])

  const tag = fortune.cat === 'joke' ? '[joke]' : '[wisdom]'

  return (
    <div style={{ padding: '4px 0' }}>
      <pre className="text-xs sm:text-sm" style={{ color: theme.success, lineHeight: 1.4 }}>
        {full.slice(0, count)}
      </pre>
      {count >= full.length && (
        <div className="text-xs mt-2" style={{ color: theme.comment }}>
          — {fortune.author} {tag}
        </div>
      )}
    </div>
  )
}
