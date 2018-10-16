import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEstabelecimentoComponent } from './consulta-estabelecimento.component';

describe('ConsultaEstabelecimentoComponent', () => {
  let component: ConsultaEstabelecimentoComponent;
  let fixture: ComponentFixture<ConsultaEstabelecimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEstabelecimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
