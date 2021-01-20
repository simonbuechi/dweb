import React from 'react'
//material-ui
// import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// web3
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
// custom
import { useEagerConnect, useInactiveListener } from './Hooks'
import {
  injected,
  walletconnect
} from './Connectors'

const ConnectorNames = {
  Injected: 'Injected',
  WalletConnect: 'WalletConnect'
};

const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect
}

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )
}


function Header() {
  const { active, error, chainId, account, library } = useWeb3React()
  const [balance, setBalance] = React.useState();

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId])

  return (
    <>
      <Typography variant="h3" textAlign="right" gutterBottom>
        Status: {active ? "you're connected" : error ? "There's a problem." : "..."}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Chain ID: {chainId}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Account: {account === null
          ? '-'
          : account
            ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
            : ''}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Balance: {balance === null ? 'Error' : balance ? `Ξ${formatEther(balance)}` : ''}
      </Typography>
    </>
  )
}

function App() {
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const [message, setMessage] = React.useState();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <>
      <Header />
      <div
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '20rem',
          margin: 'auto'
        }}
      >
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled = !triedEager || !!activatingConnector || connected || !!error

          return (
            <Button color="primary" variant="outlined"
              disabled={disabled}
              key={name}
              onClick={() => {
                setActivatingConnector(currentConnector)
                activate(connectorsByName[name])
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem'
                }}
              >
                {activating && <div>Loading...</div>}
                {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </Button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(active || error) && (
          <Button color="primary" variant="outlined"
            onClick={() => {
              deactivate()
            }}
          >
            Deactivate
          </Button>
        )}

        {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
      </div>

      <div
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: 'fit-content',
          maxWidth: '20rem',
          margin: 'auto'
        }}
      >
        {!!(library && account) && (
          <>
            <Button color="primary" variant="outlined"
              onClick={() => {
                library
                  .getSigner(account)
                  .signMessage('simonsartworks')
                  .then((signature) => {
                    setMessage(signature);
                  })
                  .catch((error) => {
                    setMessage("Failure!" + (error && error.message ? error.message : ""));
                  })
              }}
            >
              Sign Message
          </Button>
            <Typography variant="body2" gutterBottom>
              {message}
            </Typography>
          </>
        )}
        {!!(connector === connectorsByName[ConnectorNames.Network] && chainId) && (
          <Button color="primary" variant="outlined"
            onClick={() => {
              ; (connector).changeChainId(chainId === 1 ? 4 : 1)
            }}
          >
            Switch Networks
          </Button>
        )}
        {connector === connectorsByName[ConnectorNames.WalletConnect] && (
          <Button color="primary" variant="outlined"
            onClick={() => {
              ; (connector).close()
            }}
          >
            Kill WalletConnect Session
          </Button>
        )}
      </div>
    </>
  )
}