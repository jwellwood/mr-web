import { orderByPosition } from '../orderByPosition';

describe('order by position tests', () => {
  test('should correctly order items by position: GK, DF, MF, FW', () => {
    const data = [
      { name: 'Player1', position: 'MF' },
      { name: 'Player2', position: 'FW' },
      { name: 'Player3', position: 'GK' },
      { name: 'Player4', position: 'DF' },
    ];

    const result = orderByPosition(data);

    expect(result).toEqual([
      { name: 'Player3', position: 'GK' }, // GK first
      { name: 'Player4', position: 'DF' }, // Then DF
      { name: 'Player1', position: 'MF' }, // Then MF
      { name: 'Player2', position: 'FW' }, // Finally FW
    ]);
  });

  test('should place items without a position at the end', () => {
    const data = [
      { name: 'Player1', position: 'DF' },
      { name: 'Player2' }, // No position
      { name: 'Player3', position: 'MF' },
    ];

    const result = orderByPosition(data);

    expect(result).toEqual([
      { name: 'Player1', position: 'DF' },
      { name: 'Player3', position: 'MF' },
      { name: 'Player2' }, // No position at the end
    ]);
  });

  test('should return items in correct order even with mixed inputs', () => {
    const data = [
      { name: 'Player1', position: 'MF' },
      { name: 'Player2', position: 'GK' },
      { name: 'Player3', position: 'DF' },
      { name: 'Player4' }, // No position
      { name: 'Player5', position: 'FW' },
      { name: 'Player6', position: 'FW' },
    ];

    const result = orderByPosition(data);

    expect(result).toEqual([
      { name: 'Player2', position: 'GK' },
      { name: 'Player3', position: 'DF' },
      { name: 'Player1', position: 'MF' },
      { name: 'Player5', position: 'FW' },
      { name: 'Player6', position: 'FW' },
      { name: 'Player4' }, // No position at the end
    ]);
  });

  test('should return an empty array if input is empty', () => {
    const data: never[] = [];

    const result = orderByPosition(data);

    expect(result).toEqual([]);
  });
});
