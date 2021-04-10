class DateRange {
    from: Date;
    to: Date;
    constructor(from?, to?) {
      const d = new Date();
      this.to = to ? to : new Date();
      this.from = from ? from : d.setDate(-15);
    }
}

export class MetaCard {
    dateRange: DateRange;

    constructor() {
        this.dateRange = new DateRange();
    }
}
