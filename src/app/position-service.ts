// position.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
    positions = [
        {
          name: 'Position 1',
          isSelect: false,
        },
    
        {
          name: 'Position 2',
          isSelect: false,
        },
        {
          name: 'Position 3',
          isSelect: false,
        },
        {
          name: 'Position 4',
          isSelect: false,
        },
        {
          name: 'Position 5',
          isSelect: false,
        },
        {
          name: 'Position 6',
          isSelect: false,
        },
        {
          name: 'Position 7',
          isSelect: false,
        },
        {
          name: 'Position 8',
          isSelect: false,
        },
        {
          name: 'Position 9',
          isSelect: false,
        },
        {
          name: 'Position 10',
          isSelect: false,
        },
        {
          name: 'Position 11',
          isSelect: false,
        },
        {
          name: 'Position 12',
          isSelect: false,
        },
        {
          name: 'Position 13',
          isSelect: false,
        },
        {
          name: 'Position 14',
          isSelect: false,
        },
        {
          name: 'Position 15',
          isSelect: false,
        },
      ];

  getPositions() {
    return this.positions;
  }
}
