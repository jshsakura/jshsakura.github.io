import { useState, useCallback, useRef } from 'react'
import { resumeData, commands as commandList } from '../data/resume'

const VISIBLE_COMMANDS = commandList.map(c => c.cmd.split(' ')[0])
const HIDDEN_COMMANDS = ['ls', 'cd', 'cat', 'pwd', 'rm', 'sudo', 'exit', 'ping', 'cowsay', 'vim', 'nano', 'vi', 'whois', 'man', 'echo', 'mkdir', 'touch', 'mv', 'cp', 'ssh', 'wget', 'curl', 'matrix', 'hack', 'fortune', 'sl', 'top', 'htop', 'git', 'docker', 'python', 'node', 'brew', 'apt', 'apt-get', 'uname', 'hostname', 'ifconfig', 'traceroute', 'who', 'w', 'cal', 'uptime', 'free', 'yes', 'grep', 'awk', 'sed', 'chmod', 'chown', 'nmap', 'telnet', 'make', 'hello', 'hi', '42', 'flip', 'lolcat', 'screenfetch', 'figlet']
const ALL_COMMANDS = [...new Set([...VISIBLE_COMMANDS, ...HIDDEN_COMMANDS])]

let outputId = 0
const nextId = () => ++outputId

export default function useTerminal({ theme, setThemeName, themes }) {
  const [outputs, setOutputs] = useState([])
  const [historyList, setHistoryList] = useState([])
  const [showRickroll, setShowRickroll] = useState(false)
  const historyIndex = useRef(-1)

  const addOutput = useCallback((type, content, command = null) => {
    setOutputs(prev => [...prev, { id: nextId(), type, content, command }])
  }, [])

  const triggerRickroll = useCallback(() => {
    setShowRickroll(true)
  }, [])

  const executeCommand = useCallback((raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    setHistoryList(prev => [...prev, trimmed])
    historyIndex.current = -1

    addOutput('command', trimmed)

    const parts = trimmed.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')

    switch (cmd) {
      case 'help':
        addOutput('output', { type: 'help' })
        break

      case 'whoami':
        addOutput('output', { type: 'whoami' })
        break

      case 'skills':
        addOutput('output', { type: 'skills' })
        break

      case 'career':
        addOutput('output', { type: 'career' })
        break

      case 'projects':
        addOutput('output', { type: 'projects' })
        break

      case 'contact':
        addOutput('output', { type: 'contact' })
        break

      case 'neofetch':
        addOutput('output', { type: 'neofetch', themeName: theme })
        break

      case 'clear':
        setOutputs([])
        break

      case 'github':
        window.open(resumeData.personal.github, '_blank')
        addOutput('system', 'Opening GitHub profile...')
        break

      case 'repo':
        window.open('https://github.com/jshsakura/jshsakura.github.io', '_blank')
        addOutput('system', 'Opening repository...')
        break

      case 'theme': {
        if (!args) {
          addOutput('output', { type: 'theme-list', current: theme })
        } else {
          const name = args.toLowerCase()
          if (themes[name]) {
            setThemeName(name)
            addOutput('system', `Theme changed to '${themes[name].name}'`)
          } else {
            addOutput('error', `Unknown theme: '${args}'. Available: ${Object.keys(themes).join(', ')}`)
          }
        }
        break
      }

      case 'history':
        addOutput('output', {
          type: 'history',
          items: historyList,
        })
        break

      case 'date':
        addOutput('system', new Date().toString())
        break

      case 'echo':
        addOutput('system', args || '')
        break

      case 'sudo':
        if (args.startsWith('rm -rf')) {
          addOutput('output', { type: 'easter-sudo-rm' })
        } else {
          addOutput('error', 'Nice try. Permission denied.')
        }
        break

      case 'exit':
        addOutput('system', 'Logging out...')
        setTimeout(() => {
          addOutput('system', 'Saving session...')
          setTimeout(() => {
            addOutput('system', 'Closing connections...')
            setTimeout(() => {
              triggerRickroll()
              addOutput('error', 'There is no escape. You are trapped in my devterminal forever.')
            }, 1000)
          }, 1200)
        }, 1500)
        break

      case 'ls':
        addOutput('system', 'about/  skills/  career/  projects/  contact/  secret.txt')
        break

      case 'cd':
        if (args) {
          addOutput('error', `cd: permission denied: ${args}\nThis terminal is read-only. Try 'cat secret.txt' if you're curious.`)
        } else {
          addOutput('system', '~')
        }
        break

      case 'cat':
        if (args === 'secret.txt' || args === 'secret') {
          addOutput('output', { type: 'easter-profile' })
        } else {
          addOutput('system', [
            '  /\\_/\\  ',
            ' ( o.o ) ',
            '  > ^ <  ',
            ' /|   |\\',
            '(_|   |_)',
          ].join('\n'))
        }
        break

      case 'ping':
        addOutput('system', [
          'PING devterminal.seunghyeon.dev (127.0.0.1): 56 data bytes',
          '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms',
          '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms',
          '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms',
          '--- devterminal.seunghyeon.dev ping statistics ---',
          '3 packets transmitted, 3 packets received, 0.0% packet loss',
        ].join('\n'))
        break

      case 'cowsay': {
        const text = args || 'moo'
        const border = '-'.repeat(text.length + 2)
        addOutput('system', [
          ` ${border}`,
          `< ${text} >`,
          ` ${border}`,
          '        \\   ^__^',
          '         \\  (oo)\\_______',
          '            (__)\\       )\\/\\',
          '                ||----w |',
          '                ||     ||',
        ].join('\n'))
        break
      }

      case 'pwd':
        addOutput('system', '/home/visitor/seunghyeon-devterminal')
        break

      case 'whois':
        addOutput('system', `Did you mean 'whoami'?`)
        break

      case 'man':
        addOutput('system', `No manual entry for '${args || 'undefined'}'. Try 'help'.`)
        break

      case 'rm':
        addOutput('error', 'rm: permission denied. Write access is restricted on this terminal.')
        break

      case 'mkdir':
      case 'touch':
      case 'mv':
      case 'cp':
        addOutput('error', `${cmd}: permission denied. This terminal is read-only.`)
        break

      case 'vim':
      case 'nano':
      case 'vi':
        addOutput('error', `${cmd}: no write access. But you have good taste in editors.`)
        break

      case 'ssh':
        addOutput('system', 'ssh: connecting to remote host...')
        setTimeout(() => {
          addOutput('system', 'ssh: redirecting to secure channel...')
          setTimeout(() => {
            triggerRickroll()
            addOutput('error', 'Connection hijacked.')
          }, 800)
        }, 1000)
        break

      case 'matrix':
        addOutput('output', { type: 'matrix' })
        break

      case 'hack':
        addOutput('output', { type: 'hack' })
        break

      case 'fortune':
        addOutput('output', { type: 'fortune' })
        break

      case 'sl':
        addOutput('system', [
          '      ====        ________                ___________',
          '  _D _|  |_______/        \\__I_I_____===__|_________|',
          '   |(_)---  |   H\\________/ |   |        =|___ ___|',
          '   /     |  |   H  |  |     |   |         ||_| |_||',
          '  |      |  |   H  |__--------------------| [___] |',
          '  | ________|___H__/__|_____/[][]~\\_______|       |',
          '  |/ |   |-----------I_____I [][] []  D   |=======|',
          '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
          ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
          '  \\_/      \\O=====O=====O=====O_/      \\_/           ',
        ].join('\n'))
        addOutput('system', 'You meant "ls", didn\'t you?')
        break

      case 'top':
      case 'htop': {
        const upSec = Math.floor(performance.now() / 1000)
        const upMin = Math.floor(upSec / 60)
        const upStr = upMin > 0 ? `${upMin}m ${upSec % 60}s` : `${upSec}s`
        const cores = navigator.hardwareConcurrency || '?'
        const domNodes = document.querySelectorAll('*').length
        const mem = performance.memory
          ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(1)}MB / ${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(0)}MB`
          : `${navigator.deviceMemory ? navigator.deviceMemory + 'GB device' : 'unknown'}`
        const entries = performance.getEntriesByType('resource').length
        addOutput('system', [
          `top - up ${upStr}, 1 user, CPU cores: ${cores}`,
          `JS Heap: ${mem}`,
          `DOM Nodes: ${domNodes}, Resources loaded: ${entries}`,
          '',
          'PID   USER      CPU%  MEM%  COMMAND',
          `1     visitor   ${(Math.random() * 3).toFixed(1)}   ${(Math.random() * 5).toFixed(1)}    /bin/devterminal`,
          `42    system    ${(Math.random() * 2).toFixed(1)}   ${(Math.random() * 3).toFixed(1)}    react-dom/renderer`,
          `128   system    ${(Math.random() * 1).toFixed(1)}   ${(Math.random() * 2).toFixed(1)}    framer-motion`,
          `256   system    ${(Math.random() * 0.5).toFixed(1)}   ${(Math.random() * 1).toFixed(1)}    vite/hmr-client`,
          `512   visitor   0.0   0.1    cursor-blink-daemon`,
        ].join('\n'))
        break
      }

      case 'git': {
        const gitArgs = args.toLowerCase()
        if (gitArgs === 'status') {
          addOutput('system', [
            'On branch main',
            'Your branch is up to date with \'origin/main\'.',
            '',
            'Changes not staged for commit:',
            '  modified:   life/work-balance.txt',
            '  deleted:    motivation/monday.md',
            '',
            'Untracked files:',
            '  bugs/unknown-origin/',
            '  coffee/fourth-cup.log',
          ].join('\n'))
        } else if (gitArgs === 'log') {
          addOutput('system', [
            'commit abc1234 (HEAD -> main)',
            'Author: visitor <unknown@devterminal>',
            'Date:   just now',
            '',
            '    chore: pretend to understand the codebase',
            '',
            'commit def5678',
            'Author: visitor <unknown@devterminal>',
            'Date:   5 minutes ago',
            '',
            '    fix: everything (hopefully)',
          ].join('\n'))
        } else if (gitArgs.startsWith('push')) {
          addOutput('error', 'Permission denied. Nice try though.')
        } else if (gitArgs.startsWith('commit')) {
          addOutput('error', 'Nothing to commit. Your future is unwritten.')
        } else {
          addOutput('system', `git: '${args || ''}' — try 'git status' or 'git log'`)
        }
        break
      }

      case 'docker':
        addOutput('system', [
          'CONTAINER ID   IMAGE            STATUS          NAMES',
          'a1b2c3d4e5f6   devterminal:1.0  Up 99 years     portfolio',
          'f6e5d4c3b2a1   nginx:latest     Up 99 years     hopes-and-dreams',
          '',
          'Cannot connect to the Docker daemon. Is the Docker daemon running?',
          '(Just kidding, this is a browser.)',
        ].join('\n'))
        break

      case 'python':
        addOutput('system', [
          'Python 3.12.0 (devterminal build)',
          '>>> import antigravity',
          '>>> print("Hello, World!")',
          'Hello, World!',
          '>>> exit()',
          'Use Ctrl+D (i.e. EOF) to exit',
          '(Just kidding, this isn\'t really Python.)',
        ].join('\n'))
        break

      case 'node':
        addOutput('system', [
          'Welcome to Node.js v24.0.0.',
          '> console.log(typeof NaN)',
          '\'number\'   // yes, really.',
          '> [10, 9, 8, 1, 2, 3].sort()',
          '[1, 10, 2, 3, 8, 9]   // JavaScript moment.',
          '> process.exit()',
          '(This is not a real Node.js REPL.)',
        ].join('\n'))
        break

      case 'brew':
      case 'apt':
      case 'apt-get':
        addOutput('system', `${cmd}: attempting to install...`)
        setTimeout(() => {
          addOutput('error', `E: Unable to locate package "${args || 'happiness'}". This is a browser, not a real terminal.`)
        }, 800)
        break

      case 'uname':
        addOutput('system', args === '-a'
          ? 'DevTerminal 1.0.0 jshsakura.github.io React/Vite JavaScript browser aarch64'
          : 'DevTerminal')
        break

      case 'hostname':
        addOutput('system', 'jshsakura.github.io')
        break

      case 'ifconfig':
        addOutput('system', [
          'lo0: flags=8049<UP,LOOPBACK,RUNNING>',
          '     inet 127.0.0.1 netmask 0xff000000',
          'eth0: flags=8863<UP,BROADCAST,RUNNING>',
          '     inet [REDACTED] netmask 0xffffff00',
          '     status: active (nice try)',
        ].join('\n'))
        break

      case 'traceroute':
        addOutput('system', `traceroute to ${args || 'devterminal.seunghyeon.dev'}`)
        setTimeout(() => {
          addOutput('system', [
            ' 1  localhost (127.0.0.1)  0.5 ms',
            ' 2  your-router (192.168.1.1)  2.3 ms',
            ' 3  * * * (packet got lost, probably)',
            ' 4  github.io (185.199.108.153)  15.2 ms',
            ' 5  devterminal (you are here)  0.1 ms',
          ].join('\n'))
        }, 1000)
        break

      case 'who':
      case 'w':
        addOutput('system', [
          'USER     TTY      FROM              LOGIN@',
          'visitor  pts/0    browser           just now',
          '(you are the only one here... or are you?)',
        ].join('\n'))
        break

      case 'cal': {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth()
        const today = now.getDate()
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const header = `    ${monthNames[month]} ${year}`
        const days = 'Su Mo Tu We Th Fr Sa'
        const firstDay = new Date(year, month, 1).getDay()
        const lastDate = new Date(year, month + 1, 0).getDate()
        const rows = []
        let row = '   '.repeat(firstDay)
        for (let d = 1; d <= lastDate; d++) {
          const dayStr = d === today ? `\x1b[7m${String(d).padStart(2)}\x1b[0m` : String(d).padStart(2)
          row += dayStr + ' '
          if ((firstDay + d) % 7 === 0) { rows.push(row.trimEnd()); row = '' }
        }
        if (row.trim()) rows.push(row.trimEnd())
        addOutput('system', [header, days, ...rows].join('\n'))
        break
      }

      case 'uptime':
        addOutput('system', `up ${Math.floor(performance.now() / 1000)} seconds (this session)`)
        break

      case 'free':
        addOutput('system', [
          '              total     used     free',
          `Mem:     ${navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'unknown'}    mostly    never enough`,
          'Swap:    ∞        0        ∞',
          '(Your browser is hoarding all the RAM anyway.)',
        ].join('\n'))
        break

      case 'yes':
        addOutput('system', Array(20).fill(args || 'y').join('\n'))
        addOutput('system', '... (stopped after 20 lines, you\'re welcome)')
        break

      case 'grep':
      case 'awk':
      case 'sed':
        addOutput('system', `${cmd}: no input files. This is a simulated terminal — try 'help' for real commands.`)
        break

      case 'chmod':
      case 'chown':
        addOutput('error', `${cmd}: operation not permitted. Everything here is read-only.`)
        break

      case 'wget':
      case 'curl':
        addOutput('system', `${cmd}: fetching resource...`)
        setTimeout(() => {
          addOutput('system', 'HTTP/1.1 301 Moved Permanently')
          addOutput('system', 'Location: https://youtu.be/dQw4w9WgXcQ')
          setTimeout(() => {
            triggerRickroll()
            addOutput('error', 'Download complete. You have been served.')
          }, 800)
        }, 1000)
        break

      case 'nmap':
        addOutput('system', `Starting Nmap scan on ${args || 'devterminal.seunghyeon.dev'}...`)
        setTimeout(() => {
          addOutput('system', [
            'PORT      STATE    SERVICE',
            '22/tcp    filtered ssh',
            '80/tcp    open     http',
            '443/tcp   open     https',
            '3000/tcp  open     react-dev',
            '5173/tcp  open     vite-hmr',
            '8080/tcp  filtered http-proxy',
            '8888/tcp  open     oc-proxy-downloader',
            '',
            'Nmap done: 1 IP address (1 host up) scanned in 3.14 seconds',
            '(This scan is 100% fictional. No actual scanning occurred.)',
          ].join('\n'))
        }, 1500)
        break

      case 'telnet':
        if (args && args.includes('towel')) {
          addOutput('system', [
            'Connecting to towel.blinkenlights.nl...',
            '',
            '         .--.",',
            '        /    |',
            '       /     |',
            '      /      |',
            '     /   ,   |',
            '    /   / \\  |     A long time ago,',
            '   |   |   \\ |     in a galaxy far,',
            '   |   \\   | |     far away....',
            '    \\   `--\' |',
            '     `------\'',
            '',
            'Connection closed. Watch the full version on a real terminal!',
          ].join('\n'))
        } else {
          addOutput('system', `telnet: connecting to ${args || 'localhost'}...`)
          setTimeout(() => {
            addOutput('error', 'Connection refused. Try: telnet towel.blinkenlights.nl')
          }, 800)
        }
        break

      case 'make':
        if (args && args.toLowerCase().includes('coffee')) {
          addOutput('error', [
            'make: *** [coffee] Error 418',
            '',
            'HTTP 418: I\'m a teapot.',
            'This server refuses to brew coffee because it is, permanently, a teapot.',
          ].join('\n'))
        } else if (args && args.toLowerCase().includes('money')) {
          addOutput('error', 'make: *** No rule to make target \'money\'. Try \'make coffee\' instead.')
        } else if (args && args.toLowerCase().includes('love')) {
          addOutput('system', 'make: Nothing to be done for \'love\'. It\'s already everywhere.')
        } else {
          addOutput('error', `make: *** No targets specified and no makefile found. Stop.\nTry: make coffee, make money, make love`)
        }
        break

      case 'hello':
      case 'hi':
        addOutput('system', [
          `Hey there! Welcome to my devterminal.`,
          `Feel free to look around — type 'help' to see what you can do.`,
          `Or just try random commands. You might find some surprises.`,
        ].join('\n'))
        break

      case '42':
        addOutput('system', 'The Answer to the Ultimate Question of Life, the Universe, and Everything.')
        break

      case 'flip':
        addOutput('system', '(╯°□°)╯︵ ┻━┻')
        setTimeout(() => {
          addOutput('system', '┬─┬ノ( º _ ºノ)  ...please respect the furniture.')
        }, 1500)
        break

      case 'lolcat':
        addOutput('output', { type: 'lolcat', text: args || 'meow~ 🌈' })
        break

      case 'screenfetch':
        addOutput('output', { type: 'neofetch', themeName: theme })
        break

      case 'figlet': {
        const text = (args || 'hello').toUpperCase().slice(0, 10)
        const figletMap = {
          A: ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
          B: ['████ ', '█   █', '████ ', '█   █', '████ '],
          C: [' ████', '█    ', '█    ', '█    ', ' ████'],
          D: ['████ ', '█   █', '█   █', '█   █', '████ '],
          E: ['█████', '█    ', '████ ', '█    ', '█████'],
          F: ['█████', '█    ', '████ ', '█    ', '█    '],
          G: [' ████', '█    ', '█  ██', '█   █', ' ████'],
          H: ['█   █', '█   █', '█████', '█   █', '█   █'],
          I: ['█████', '  █  ', '  █  ', '  █  ', '█████'],
          J: ['█████', '    █', '    █', '█   █', ' ███ '],
          K: ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
          L: ['█    ', '█    ', '█    ', '█    ', '█████'],
          M: ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
          N: ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
          O: [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
          P: ['████ ', '█   █', '████ ', '█    ', '█    '],
          Q: [' ███ ', '█   █', '█ █ █', '█  █ ', ' ██ █'],
          R: ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
          S: [' ████', '█    ', ' ███ ', '    █', '████ '],
          T: ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
          U: ['█   █', '█   █', '█   █', '█   █', ' ███ '],
          V: ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
          W: ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
          X: ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
          Y: ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
          Z: ['█████', '   █ ', '  █  ', ' █   ', '█████'],
          ' ': ['     ', '     ', '     ', '     ', '     '],
          '!': ['  █  ', '  █  ', '  █  ', '     ', '  █  '],
        }
        const rows = [[], [], [], [], []]
        for (const ch of text) {
          const glyph = figletMap[ch] || figletMap[' ']
          for (let r = 0; r < 5; r++) rows[r].push(glyph[r])
        }
        addOutput('system', rows.map(r => r.join(' ')).join('\n'))
        break
      }

      default:
        addOutput('error', `command not found: ${cmd}. Type 'help' for available commands.`)
    }
  }, [addOutput, theme, setThemeName, themes, historyList])

  const navigateHistory = useCallback((direction) => {
    if (historyList.length === 0) return null

    let newIndex = historyIndex.current
    if (direction === 'up') {
      newIndex = historyIndex.current === -1
        ? historyList.length - 1
        : Math.max(0, historyIndex.current - 1)
    } else {
      if (historyIndex.current === -1) return null
      newIndex = historyIndex.current + 1
      if (newIndex >= historyList.length) {
        historyIndex.current = -1
        return ''
      }
    }

    historyIndex.current = newIndex
    return historyList[newIndex] || ''
  }, [historyList])

  const getAutocomplete = useCallback((input) => {
    if (!input) return null
    const lower = input.toLowerCase()
    const parts = lower.split(/\s+/)

    // Argument autocomplete (e.g. "cat sec" → "cat secret.txt")
    if (parts.length >= 2) {
      const cmd = parts[0]
      const arg = parts.slice(1).join(' ')
      const files = ['about/', 'skills/', 'career/', 'projects/', 'contact/', 'secret.txt']
      const fileMatches = files.filter(f => f.startsWith(arg))
      if (fileMatches.length === 1) return `${cmd} ${fileMatches[0]}`
      if (fileMatches.length > 1) {
        addOutput('system', fileMatches.join('  '))
        const common = fileMatches.reduce((a, b) => {
          let i = 0
          while (i < a.length && i < b.length && a[i] === b[i]) i++
          return a.slice(0, i)
        })
        if (common.length > arg.length) return `${cmd} ${common}`
        return null
      }
      return null
    }

    // Command autocomplete
    const matches = VISIBLE_COMMANDS.filter(c => c.startsWith(lower))
    if (matches.length === 1) return matches[0]
    if (matches.length > 1) {
      addOutput('system', matches.join('  '))
      const common = matches.reduce((a, b) => {
        let i = 0
        while (i < a.length && i < b.length && a[i] === b[i]) i++
        return a.slice(0, i)
      })
      if (common.length > lower.length) return common
      return null
    }
    return null
  }, [addOutput])

  return {
    outputs,
    executeCommand,
    navigateHistory,
    getAutocomplete,
    addOutput,
    setOutputs,
    showRickroll,
    setShowRickroll,
  }
}
