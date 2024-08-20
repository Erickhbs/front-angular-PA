import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DiaSemana } from '../../dados/dia-semana-data';
import { Horario } from '../../dados/horario-data';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiaSemanaService } from '../../service/dia-semana.service';

@Component({
  selector: 'app-form-dia-horario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="aplicaForm" (ngSubmit)="submeterForm()">
      <h3>Dias da semana</h3>
      <div formGroupName="dias" class="botoes">
        <div *ngFor="let d of dias">
          <input type="checkbox" id="{{ d.id }}" [formControlName]="d.id!">
          <label for="{{ d.id }}">
            {{ d.dia }}
          </label>
          <br>
        </div>
      </div>

      <h3>Horários</h3>
      <div formGroupName="horarios" class="botoes">
        <div *ngFor="let h of horarios">
          <input type="checkbox" id="{{ h.id }}" [formControlName]="h.id!"> 
          <label for="{{ h.id }}">
            {{ h.hora }}
          </label>
          <br>
        </div>
      </div>

      <button type="submit" class="btn btn-secondary">Adicionar horários</button>
    </form>
  `,
  styleUrls: ['./form-dia-horario.component.css']
})
export class FormDiaHorarioComponent implements OnChanges {
  @Input() dias: DiaSemana[] = [];
  @Input() horarios: Horario[] = [];

  diaService = inject(DiaSemanaService);

  aplicaForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    // Inicializando o formulário com grupos vazios
    this.aplicaForm = this.formBuilder.group({
      horarios: this.formBuilder.group({}),
      dias: this.formBuilder.group({})
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Verifica se os dias e horários foram atualizados
    if (changes['dias'] && this.dias.length > 0) {
      this.updateDiasForm();
    }

    if (changes['horarios'] && this.horarios.length > 0) {
      this.updateHorariosForm();
    }
  }

  private updateDiasForm() {
    const diasGroup = this.formBuilder.group({});
    this.dias.forEach(d => {
      diasGroup.addControl(d.id!.toString(), this.formBuilder.control(false, Validators.required));
    });
    this.aplicaForm.setControl('dias', diasGroup);
  }

  private updateHorariosForm() {
    const horariosGroup = this.formBuilder.group({});
    this.horarios.forEach(h => {
      horariosGroup.addControl(h.id!.toString(), this.formBuilder.control(false, Validators.required));
    });
    this.aplicaForm.setControl('horarios', horariosGroup);
  }

  submeterForm() {
    let horariosSelecionados: Horario[] = [];
    const horarioFormGroup = this.aplicaForm.value.horarios;
    const horarioFormGroupKeys = Object.keys(horarioFormGroup);

    for(let key of horarioFormGroupKeys){
      if(horarioFormGroup[key]){
        let horario = this.horarios.filter(h => key == h.id!);

        if(horario.length > 0){
          horariosSelecionados.push(horario[0]);
        }
      }
    }

    const diaFormGroup = this.aplicaForm.value.dias;
    const diaFormGroupKeys = Object.keys(diaFormGroup);

    for(let key of diaFormGroupKeys){
      if(diaFormGroup[key]){
        let dia = this.dias.filter(d => key == d.id);
        if(dia.length > 0){
          dia[0].horarios = horariosSelecionados;

          this.diaService.atualizarDia(dia[0]);
        }
      }
    }
  }
}
