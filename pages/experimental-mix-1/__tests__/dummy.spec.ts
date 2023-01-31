import { describe, it, expect, vi } from 'vitest';

describe('dummy tests', () => {
  it('simple valid equation', () => {
    expect(Math.sqrt(4)).toBe(2);
    expect(2 + 5).toBe(7);
    expect(3 * 5).toBe(15);
    expect(24 / 6).toBe(4);
  });
  it('error interception', () => {
    expect(() => {
      throw new Error('Test error!');
    }).toThrow('Test error!');
    expect(() => {
      throw new Error('Test error!');
    }).toThrowError('Test error!');
  });
  it('mocking with a spy', () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const getLatest = (index: number) => messages.items[index];

    const messages = {
      items: [
        { message: 'Simple test message', from: 'TestMan' },
        // ...
      ],
      getLatest, // can also be a `getter or setter if supported`
    };
    const spy = vi.spyOn(messages, 'getLatest');
    expect(spy.getMockName()).toEqual('getLatest');
    expect(messages.getLatest(messages.items.length - 1)).toEqual(
      messages.items[messages.items.length - 1]
    );
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockImplementationOnce(() => {
      return { message: 'Simple test message2', from: 'TestMan' };
    });
    expect(messages.getLatest(0)).toEqual({
      message: 'Simple test message2',
      from: 'TestMan',
    });

    expect(spy).toHaveBeenCalledTimes(2);
  });
  it('mocking with a mock', () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const getLatest = (index: number) => messages.items[index];

    const messages = {
      items: [
        { message: 'Simple test message', from: 'TestMan' },
        // ...
      ],
      getLatest, // can also be a `getter or setter if supported`
    };

    const mock = vi.fn().mockImplementation(getLatest);

    expect(mock(messages.items.length - 1)).toEqual(
      messages.items[messages.items.length - 1]
    );
    expect(mock).toHaveBeenCalledTimes(1);

    mock.mockImplementationOnce(() => {
      return { message: 'Simple test message2', from: 'TestMan' };
    });
    expect(mock(0)).toEqual({
      message: 'Simple test message2',
      from: 'TestMan',
    });

    expect(mock).toHaveBeenCalledTimes(2);

    expect(mock(messages.items.length - 1)).toEqual(
      messages.items[messages.items.length - 1]
    );
    expect(mock).toHaveBeenCalledTimes(3);
  });
  it('mocking JS alert()', () => {
    // eslint-disable-next-line no-console
    const alertFct = (message: string) => console.log(message);
    const alert = vi.fn().mockImplementation(alertFct);
    const testableCode = () => {
      alert('to-da!');
    };

    expect(testableCode()).toBeUndefined();
    expect(alert).toHaveBeenCalledWith('to-da!');
    expect(alert).toHaveBeenCalledTimes(1);
  });
});
