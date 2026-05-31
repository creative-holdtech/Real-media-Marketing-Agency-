import * as migration_20260531_043322_initial from './20260531_043322_initial';

export const migrations = [
  {
    up: migration_20260531_043322_initial.up,
    down: migration_20260531_043322_initial.down,
    name: '20260531_043322_initial'
  },
];
