import { Drug, Pharmacy } from "./pharmacy";

/****************/
/* Typical drug */
/****************/
describe("Pharmacy", () => {
  it("Typical drug should decrease the benefit and expiresIn before expiration", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );
  });
});

describe("Pharmacy", () => {
  it("Typical drug should decrease expiresIn but not benefit once it reaches 0", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)]
    );
  });
});

describe("Pharmacy", () => {
  it("Typical drug should decrease the benefit twice once expired", () => {
    expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 1)]
    );
  });
});

describe("Pharmacy", () => {
  it("Typical drug should decrease the benefit twice once expired until it reaches 0", () => {
    expect(new Pharmacy([new Drug("test", 0, 1)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 0)]
    );
  });
});

describe("Pharmacy", () => {
  it("Typical drug should decrease expiresIn but not benefit once it reaches 0 even when expired", () => {
    expect(new Pharmacy([new Drug("test", -2, 1)]).updateBenefitValue()).toEqual(
      [new Drug("test", -3, 0)]
    );
  });
});


/****************/
/* Herbal Tea   */
/****************/
describe("Pharmacy", () => {
  it("Herbal Tea should increase the benefit and decrease expiresIn before expiration", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 1, 4)]
    );
  });
});

describe("Pharmacy", () => {
  it("Herbal Tea should increase the benefit twice once expired", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", -1, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -2, 5)]
    );
  });
});

describe("Pharmacy", () => {
  it("Herbal Tea should let the benefit unchanged once it reaches 50 before expiration", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 2, 50)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 1, 50)]
    );
  });
});

describe("Pharmacy", () => {
  it("Herbal Tea should let the benefit unchanged once it reaches 50 when expired", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", -1, 49)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -2, 50)]
    );
  });
});

/****************/
/* Magic Pill   */
/****************/
describe("Pharmacy", () => {
  it("Magic Pill never changes its benefit nor expiration date", () => {
    expect(new Pharmacy([new Drug("Magic Pill", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Magic Pill", 2, 3)]
    );
  });
});

/****************/
/* Fervex       */
/****************/
describe("Pharmacy", () => {
  it("Fervex should increase the benefit and decrease expiresIn before expiration", () => {
    expect(new Pharmacy([new Drug("Fervex", 11, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 10, 4)]
    );
  });
});

describe("Pharmacy", () => {
  it("Fervex should let the benefit unchanged once it reaches 50 before expiration", () => {
    expect(new Pharmacy([new Drug("Fervex", 11, 50)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 10, 50)]
    );
  });
});

describe("Pharmacy", () => {
  it("Fervex should increase the benefit twice when 5 < expiresIn <= 10", () => {
    expect(new Pharmacy([new Drug("Fervex", 10, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 9, 5)]
    );
  });
});

describe("Pharmacy", () => {
  it("Fervex should increase the benefit threefold when 0 < expiresIn <= 5", () => {
    expect(new Pharmacy([new Drug("Fervex", 5, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 4, 6)]
    );
  });
});

describe("Pharmacy", () => {
  it("Fervex should drop the benefit to 0 once it expires", () => {
    expect(new Pharmacy([new Drug("Fervex", -1, 30)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", -2, 0)]
    );
  });
});

describe("Pharmacy", () => {
  it("Fervex should let the benefit unchanged once it reaches 50 and expiresIn > 10", () => {
    expect(new Pharmacy([new Drug("Fervex", 11, 50)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 10, 50)]
    );
  });
});

describe("Pharmacy", () => {
  it("Fervex should let the benefit unchanged once it reaches 50 when 5 < expiresIn <= 10", () => {
    expect(new Pharmacy([new Drug("Fervex", 10, 49)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 9, 50)]
    );
  });
});

describe("Pharmacy", () => {
  it("Fervex should let the benefit unchanged once it reaches 50 when 0 < expiresIn <= 5", () => {
    expect(new Pharmacy([new Drug("Fervex", 5, 49)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 4, 50)]
    );
  });
});