import { enginesVersion, getCliQueryEngineBinaryType } from '@prisma/engines'
import { BinaryType, getVersion } from '../..'

const testIf = (condition: boolean) => (condition ? test : test.skip)
const useNodeAPI = getCliQueryEngineBinaryType() === BinaryType.libqueryEngine

describe('getVersion', () => {
  test('Introspection Engine', async () => {
    const introspectionEngineVersion = await getVersion(undefined, BinaryType.introspectionEngine)
    expect(introspectionEngineVersion.split(' ')[1]).toMatch(enginesVersion)
  })

  test('Migration Engine', async () => {
    const migrationEngineVersion = await getVersion(undefined, BinaryType.migrationEngine)
    expect(migrationEngineVersion.split(' ')[1]).toMatch(enginesVersion)
  })

  test('Prisma Fmt', async () => {
    const prismaFmtVersion = await getVersion(undefined, BinaryType.prismaFmt)
    expect(prismaFmtVersion.split(' ')[1]).toMatch(enginesVersion)
  })

  testIf(!useNodeAPI)('Query Engine', async () => {
    const queryEngineVersion = await getVersion(undefined, BinaryType.queryEngine)
    expect(queryEngineVersion.split(' ')[1]).toMatch(enginesVersion)
  })
  testIf(useNodeAPI)('Query Engine (Node-API)', async () => {
    const libqueryEngineVersion = await getVersion(undefined, BinaryType.libqueryEngine)
    expect(libqueryEngineVersion.split(' ')[1]).toMatch(enginesVersion)
  })
})
