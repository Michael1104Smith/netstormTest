import AccountStore from '../stores/AccountStore'

import analytics from '../utils/analytics'
import { injected } from '../utils/connectors'
import { providerName } from '../utils/web3'
import { isMobileMetaMask } from '../utils/device'

export const walletLogin = (showLogin, activate) => {
  const provider = providerName() || ''
  if (
    provider.match(
      'coinbase|imtoken|cipher|alphawallet|gowallet|trust|status|mist|parity|metamask'
    ) ||
    isMobileMetaMask()
  ) {
    activate(injected)
  } else if (showLogin) {
    showLogin()
  }
}

export const login = (address) => {
  AccountStore.update((s) => {
    s.address = address
  })

  analytics.identify(address)

  localStorage.setItem('eagerConnect', true)
}

export const logout = () => {
  AccountStore.update((s) => {
    s.address = null
    s.allowances = {}
    s.balances = {}
  })
}

export const refetchUserData = () => {
  AccountStore.update((s) => {
    s.refetchUserData = true
  })
}

export const refetchStakingData = () => {
  AccountStore.update((s) => {
    s.refetchStakingData = true
  })
}
