export class DateFormatter {
  private static months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  public static toMDY(date: Date): string {
    let month = DateFormatter.months[date.getMonth()];
    let day = date.getUTCDate();
    let year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }
}
