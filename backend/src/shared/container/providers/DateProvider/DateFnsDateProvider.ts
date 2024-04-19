import { IDateProvider } from "./IDateProvider";
import { addDays, isWeekend } from 'date-fns';

export class DateFnsDateProvider implements IDateProvider {
  sumWorkingDays(startDate: Date, daysToAdd: number): Date {
    let currentDate = new Date(startDate); // Cria uma cópia da data inicial
    let addedDays = 0;

    while (addedDays < daysToAdd) {
      // Adiciona um dia à data atual
      currentDate = addDays(currentDate, 1);

      // Verifica se o dia atual não é um fim de semana
      if (!isWeekend(currentDate)) {
        addedDays++; // Incrementa os dias úteis adicionados
      }
    }

    return currentDate;
  }
}