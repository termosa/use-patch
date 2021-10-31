import usePatch from './'
import { renderHook, act } from "@testing-library/react-hooks";

describe('usePatch()', () => {
  const executeHook = (...args: Parameters<typeof usePatch>) => renderHook(() => usePatch(...args)).result

  it('has expected interface', async () => {
    const patch = executeHook({}).current;

    expect(patch).toHaveProperty('value', {})
    expect(patch).toHaveProperty('diff', {})
    expect(patch).toHaveProperty('changed', false)

    expect(patch).toHaveProperty('apply')
    expect(patch.apply).toBeInstanceOf(Function)
    expect(patch).toHaveProperty('set')
    expect(patch.set).toBeInstanceOf(Function)
    expect(patch).toHaveProperty('reset')
    expect(patch.reset).toBeInstanceOf(Function)

    expect(Object.keys(patch)).toHaveLength(6)
  });

  it('always set initial object as value', async () => {
    expect(executeHook({}).current).toHaveProperty('value', {})
    expect(executeHook({ test: true }).current).toHaveProperty('value', { test: true })
    expect(executeHook({ rock: { star: 'here' } }).current).toHaveProperty('value', { rock: { star: 'here' } })
  });

  it('replaces the value using set() function without modifying the original object', async () => {
    const origin = { test: 0 }
    const result = executeHook(origin)
    expect(result.current).toHaveProperty('value', { test: 0 })
    act(() => result.current.set({ test: 1 }))
    expect(result.current).toHaveProperty('value', { test: 1 })
    act(() => result.current.set({ test2: 123 }))
    expect(result.current).toHaveProperty('value.test2', 123)
    expect(result.current).toHaveProperty('value.test') // the only way to ensure that property exists
    expect(result.current.value.test).toBe(undefined)
    expect(origin).toEqual({ test: 0 })
  });

  it('restores original value using reset() function without modifying original object', async () => {
    const origin = { test: 'here' }
    const result = executeHook(origin)
    act(() => result.current.set({ test: 'there' }))
    expect(result.current).toHaveProperty('value', { test: 'there' })
    act(() => result.current.reset())
    expect(result.current).toHaveProperty('value', { test: 'here' })
    expect(origin).toEqual({ test: 'here' })
  });

  it('modifies value object using apply() function without modifying original object', async () => {
    const origin = { test: 'here' }
    const result = executeHook(origin)
    act(() => result.current.apply({ test2: 'there' }))
    expect(result.current).toHaveProperty('value', { test: 'here', test2: 'there' })
    act(() => result.current.apply({ test: 'where' }))
    expect(result.current).toHaveProperty('value', { test: 'where', test2: 'there' })
    act(() => result.current.apply({ test: 'here', test3: 'here and there' }))
    expect(result.current).toHaveProperty('value', { test: 'here', test2: 'there', test3: 'here and there' })
    expect(origin).toEqual({ test: 'here' })
  });

  it('tracks changes done with apply(), set() and reset() functions via diff property', async () => {
    const origin = { test: 'here' }
    const result = executeHook(origin)

    expect(result.current).toHaveProperty('diff', {})
    act(() => result.current.apply({ test2: 'there' }))
    expect(result.current).toHaveProperty('diff', { test2: 'there' })
    act(() => result.current.apply({ test: 'where' }))
    expect(result.current).toHaveProperty('diff', { test: 'where', test2: 'there' })
    act(() => result.current.apply({ test: 'here' }))
    expect(result.current).toHaveProperty('diff', { test2: 'there' })
    act(() => result.current.set({ test3: 'there' }))
    expect(result.current).toHaveProperty('diff', { test: undefined, test3: 'there' })
    expect(result.current.diff).toHaveProperty('test') // the only way to ensure that property exists
    act(() => result.current.reset())
    expect(result.current).toHaveProperty('diff', {})
  });
});