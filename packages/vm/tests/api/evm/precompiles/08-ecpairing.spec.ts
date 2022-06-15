import tape from 'tape'
import Common, { Chain, Hardfork } from '@ethereumjs/common'
import VM from '../../../../src'
import { getActivePrecompiles } from '../../../../src/evm/precompiles'

tape('Precompiles: ECPAIRING', (t) => {
  t.test('ECPAIRING', async (st) => {
    const common = new Common({ chain: Chain.Mainnet, hardfork: Hardfork.Petersburg })
    const vm = await VM.create({ common: common })
    const addressStr = '0000000000000000000000000000000000000008'
    const ECPAIRING = getActivePrecompiles(common).get(addressStr)!

    const result = await ECPAIRING({
      data: Buffer.from(
        '00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c21800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa000000000000000000000000000000000000000000000000000000000000000130644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd45198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c21800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa',
        'hex'
      ),
      gasLimit: BigInt(0xffffff),
      _common: common,
      _EVM: vm.evm,
    })

    st.deepEqual(
      result.executionGasUsed,
      BigInt(260000),
      'should use petersburg gas costs (k ^= 2 pairings)'
    )
    st.end()
  })
})
