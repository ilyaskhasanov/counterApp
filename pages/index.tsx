import { ConnectWallet, Web3Button, useContract } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const Home: NextPage = () => {
  const contractAddress = '0x16E71d4a983e9B5C7F05C0Ec8Db5949d0a089450'
  const { contract } = useContract(contractAddress)
  const [counter, setCounter] = useState<string | undefined>(undefined)

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        <h1> Counter Dapp(decentralized app)</h1>
        <h3> {counter} </h3>
        <Web3Button
          contractAddress={contractAddress}
          action={() => getCounter()}
        >
          Refresh Counter
        </Web3Button>

        <Web3Button
          contractAddress={contractAddress}
          action={(contract) => contract.call('incrementCounter')}
        >
          + Increment
        </Web3Button>

        <Web3Button
          contractAddress={contractAddress}
          action={(contract) => contract.call('decrementCounter')}
        >
          - Decrement
        </Web3Button>
      </main>
    </div>
  )
}

export default Home
