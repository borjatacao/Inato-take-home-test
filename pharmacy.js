function updateBenefitValueNormalDrug(drug, benefitDegradationRate = 1) {
  if (drug.benefit > 0) {
    if (drug.expiresIn > 0) drug.benefit -= benefitDegradationRate;
    else drug.benefit -= 2 * benefitDegradationRate;

    if (drug.benefit < 0) drug.benefit = 0;
  }

  drug.expiresIn--;
}

let updateBenefitValueStrategies = {
  "Herbal Tea": function(drug) {
    if (drug.expiresIn > 0) drug.benefit += 1;
    else drug.benefit += 2;

    if (drug.benefit > Drug.maxBenefit) drug.benefit = Drug.maxBenefit;

    drug.expiresIn--;
  },
  "Magic Pill": function(drug) {},
  Fervex: function(drug) {
    if (drug.expiresIn > 10) drug.benefit += 1;
    else if (drug.expiresIn > 5) drug.benefit += 2;
    else if (drug.expiresIn > 0) drug.benefit += 3;
    else drug.benefit = 0;

    if (drug.benefit > Drug.maxBenefit) drug.benefit = Drug.maxBenefit;

    drug.expiresIn--;
  },
  Dafalgan: drug => updateBenefitValueNormalDrug(drug, 2),
  default: updateBenefitValueNormalDrug
};

export class Drug {
  static maxBenefit = 50;

  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
  updateBenefitValueDrug() {
    (
      updateBenefitValueStrategies[this.name] ||
      updateBenefitValueStrategies["default"]
    )(this);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      this.drugs[i].updateBenefitValueDrug();
    }

    return this.drugs;
  }
}
