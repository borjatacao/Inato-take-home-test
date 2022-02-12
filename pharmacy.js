let updateBenefitValueStrategies = {
  "Herbal Tea": function() {
    if (this.expiresIn > 0) this.benefit += 1;
    else this.benefit += 2;

    if (this.benefit > Drug.maxBenefit) this.benefit = Drug.maxBenefit;

    this.expiresIn--;
  },
  "Magic Pill": function() {},
  Fervex: function() {
    if (this.expiresIn > 10) this.benefit += 1;
    else if (this.expiresIn > 5) this.benefit += 2;
    else if (this.expiresIn > 0) this.benefit += 3;
    else this.benefit = 0;

    if (this.benefit > Drug.maxBenefit) this.benefit = Drug.maxBenefit;

    this.expiresIn--;
  },
  default: function() {
    if (this.benefit > 0) {
      if (this.expiresIn > 0) this.benefit -= 1;
      else this.benefit -= 2;

      if (this.benefit < 0) this.benefit = 0;
    }

    this.expiresIn--;
  }
};

export class Drug {
  static maxBenefit = 50;

  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;

    this.updateBenefitValue =
      updateBenefitValueStrategies[this.name] ||
      updateBenefitValueStrategies["default"];
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].updateBenefitValue();
    }

    return this.drugs;
  }
}
