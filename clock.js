class Clock {
  constructor() {
    const date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.printTime();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    const timeString = `${this.hours}:${this.minutes}:${this.seconds}`;
    console.log(timeString);
  }

  _tick() {
    this.seconds += 1;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes += 1;

      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours += 1;

        if (this.hours === 24) { this.hours = 0; }
      }
    }
    this.printTime();
  }
}
