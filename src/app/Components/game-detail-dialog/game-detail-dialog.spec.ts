import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailDialog } from './game-detail-dialog';

describe('GameDetailDialog', () => {
  let component: GameDetailDialog;
  let fixture: ComponentFixture<GameDetailDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
