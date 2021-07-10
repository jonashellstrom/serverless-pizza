type SizeOption = "small" | "medium" | "large"

type ProteinTopping =
  | "pepperoni"
  | "ham"
  | "italianSausage"
  | "bbqChicken"
  | "bacon"

type VegetableTopping = "greenPepper" | "mushroom" | "onion" | "olive"

export type Pie = {
  size: SizeOption
  cheese: SizeOption
  toppings: Array<ProteinTopping | VegetableTopping>
}
