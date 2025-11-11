# @nura-js/react

React adapter for Nura.js - Make your React apps AI-friendly.

## Installation

\`\`\`bash
npm install @nura-js/react @nura-js/core @nura-js/dom
# or
pnpm add @nura-js/react @nura-js/core @nura-js/dom
\`\`\`

## Usage

### Setup Provider

\`\`\`tsx
import { NuraProvider } from '@nura-js/react'

function App() {
  return (
    <NuraProvider config={{ debug: true }}>
      <YourApp />
    </NuraProvider>
  )
}
\`\`\`

### Register Actions

\`\`\`tsx
import { useNuraAction } from '@nura-js/react'

function MyComponent() {
  useNuraAction({
    verb: 'open',
    scope: 'modal',
    handler: () => {
      console.log('Opening modal')
    }
  })

  return <div>My Component</div>
}
\`\`\`

### Mark Elements

\`\`\`tsx
import { useNuraElement } from '@nura-js/react'

function Button() {
  const ref = useNuraElement<HTMLButtonElement>({
    scope: 'submit-button',
    act: ['click', 'submit']
  })

  return <button ref={ref}>Submit</button>
}
\`\`\`

### Use Components

\`\`\`tsx
import { NuraElement, NuraButton } from '@nura-js/react'

function Form() {
  return (
    <NuraElement scope="form" listen={['submit']}>
      <NuraButton scope="submit-button">
        Submit
      </NuraButton>
    </NuraElement>
  )
}
\`\`\`

## API

### Hooks

- \`useNura()\` - Access registry and indexer
- \`useNuraAction(options)\` - Register actions
- \`useNuraElement(options)\` - Mark elements with Nura attributes
- \`useNuraPermission(options)\` - Add permissions
- \`useHasPermission(verb, scope)\` - Check permissions
- \`useNuraEvent(type, listener)\` - Listen to Nura events

### Components

- \`<NuraProvider>\` - Context provider
- \`<NuraElement>\` - Generic element wrapper
- \`<NuraButton>\` - Button with Nura attributes

## License

MIT
\`\`\`
